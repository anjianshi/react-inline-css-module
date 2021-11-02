export interface MatchOptions {
  ReactVariableName?: string
}

export interface MatchedStyleImport {
  statement: string,
  prefix: string,
  variable?: string,
  filepath: string,
}


let nextId = 1
function makeVariableName() {
  return `__cls_${nextId++}`
}


export default function matchStyleImports(source: string, options: MatchOptions) {
  const { ReactVariableName = 'React' } = options

  // 找到引用 CSS Module 样式的地方
  // Find imports of modular style file.
  const pattern = /(^|\n)\s*import(?:\s+(.+?)\s+from)?\s+(?:'|")(.+?\.module\.(?:css|less|sass|scss))(?:'|");?/g
  const matches: MatchedStyleImport[] = [...source.matchAll(pattern)]
    .map(([statement, prefix, variable, filepath]) => ({ statement, prefix, variable, filepath }))

  if (matches.length) {
    // 保证样式模块会导出一个变量到 JavaScript 里
    // Make sure it export a variable info script.
    for(const match of matches) {
      if (!match.variable) {
        const variable = makeVariableName()
        match.variable = variable
        source = source.replace(match.statement, `${match.prefix}import ${variable} from '${match.filepath}';`)
      }
    }

    // 修改 JavaScript 代码，用自定义的 CreateElement 代替 React.createElement，并对传入的 styleName props 进行转义
    // Update source, use custom CreateElement replaces React.createElement to transform styleName props.
    const classVariables = matches.map(m => m.variable)
    source = source.replace(new RegExp(`${ReactVariableName}\\.createElement\\(`, 'g'), `TransformStyleNameCreateElement(${ReactVariableName}, [${classVariables.join(',')}], `)
    source = "import TransformStyleNameCreateElement from 'react-inline-css-module/dist/TransformStyleNameCreateElement';\n" + source
  }

  return source
}

/**
 * 将 styleName 转换函数引入代码
 */
export function importStyleNameTransformer(source: string) {
  return "import TransformStyleNameCreateElement from 'react-inline-css-module/dist/TransformStyleNameCreateElement';\n" + source
}


/**
 * 找出代码中的样式引用，用带上样式引用信息的 styleNameTransformer 包裹原 React.createElement 调用
 */
export interface Options {
  ReactVariableName?: string
}

export function handleStyleName(source: string, options: Options) {
  const { ReactVariableName = 'React' } = options

  const matched = matchStyleImports(source)
  if (matched === null) return
  const classVariables = matched.variables
  source = matched.source

  source = source.replace(
    new RegExp(`${ReactVariableName}\\.createElement\\(`, 'g'),
    `TransformStyleNameCreateElement(${ReactVariableName}, [${classVariables.join(',')}], `
  )
  return source
}


/**
 * 找出代码中引入的所有样式文件，确保每个引入都指定变量名（以便后面引用）
 */
interface StyleImport {
  statement: string,
  prefixStatement: string,
  variable?: string,
  filepath: string,
}

let nextId = 1
function makeVariableName() {
  return `__cls_${nextId++}`
}

function matchStyleImports(source: string) {
  const pattern = /(^|\n)\s*import(?:\s+(.+?)\s+from)?\s+(?:'|")(.+?\.module\.(?:css|less|sass|scss))(?:'|");?/g
  const imports: StyleImport[] = [...source.matchAll(pattern)]
    .map(([statement, prefixStatement, variable, filepath]) => ({ statement, prefixStatement, variable, filepath }))

  if (imports.length) {
    for(const info of imports) {
      if (!info.variable) {
        const variable = makeVariableName()
        info.variable = variable
        source = source.replace(info.statement, `${info.prefixStatement}import ${variable} from '${info.filepath}';`)
      }
    }
  }

  return imports.length ? {
    variables: imports.map(info => info.variable),
    source
  } : null
}

/**
 * 找出代码中引入的样式文件
 */
interface StyleImport {
  statement: string,          // 引入了样式文件的语句
  prefixStatement: string,    // 引入语句前面的修饰符（空格、换行符等）
  variable?: string,          // 引入模块时指定的变量名
  filepath: string,           // 引入的文件路径
}
export function findStyleImports(source: string): StyleImport[] {
  const pattern = /(^|\n)\s*import(?:\s+(.+?)\s+from)?\s+(?:'|")(.+?\.module\.(?:css|less|sass|scss))(?:'|");?/g
  return [...source.matchAll(pattern)]
    .map(([statement, prefixStatement, variable, filepath]) => ({ statement, prefixStatement, variable, filepath }))
}


/**
 * 给没指定变量名的样式引入补充上变量名
 */
export function formatVariableForStyleImports(source: string, imports: StyleImport[]) {
  for(const info of imports) {
    if (!info.variable) {
      const variable = makeVariableName()
      info.variable = variable
      source = source.replace(info.statement, `${info.prefixStatement}import ${variable} from '${info.filepath}';`)
    }
  }

  return {
    variables: imports.map(info => info.variable) as string[],
    source
  }
}

let nextId = 1
function makeVariableName() {
  return `__cls_${nextId++}`
}


/**
 * 将 styleName 转换函数引入代码
 */
export function importStyleNameTransformer(source: string) {
  return "import TransformStyleNameCreateElement from 'react-inline-css-module/dist/TransformStyleNameCreateElement';\n" + source
}


/**
 * 用 styleName 转换函数包裹原 React.createElement() 调用
 */
export function applyStyleNameTransformer(source: string, classVariables: string[], reactVariableName: string) {
  source = source.replace(
    // 另两种包裹函数名的由来见：https://www.typescriptlang.org/docs/handbook/jsx.html
    new RegExp(`(${reactVariableName}\\.createElement|_jsx|_jsxDEV)\\(`, 'g'),
    `TransformStyleNameCreateElement($1, [${classVariables.join(',')}], `
  )
  return source
}

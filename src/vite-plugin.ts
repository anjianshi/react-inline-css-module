import { findStyleImports, formatVariableForStyleImports, importStyleNameTransformer, applyStyleNameTransformer } from './handle-style-name'


interface Options {
  reactVariableName?: string
}

function matchId(id: string) {
  return id.endsWith('tsx') || id.endsWith('jsx')
}

const KEEP_STATEMENT = `console.log(TransformStyleNameCreateElement)`     // 用来保证前一个插件引入的 TransformStyleNameCreateElement() 不会因依赖分析被移除


export default function reactInlineCSSModulePlugins(options: Options = {}) {
  const { reactVariableName = 'React' } = options

  return [{
    name: 'react-inline-css-module-import',
    enforce: 'pre' as 'pre',
    transform(source: string, id: string) {
      if (matchId(id) && findStyleImports(source).length) {
        return {
          code: importStyleNameTransformer(source, true) + '\n;\n' + KEEP_STATEMENT + ';\n',
          map: null
        }
      }
    }
  },
  {
    name: 'react-inline-css-module-transform',
    enforce: 'post' as 'post',
    transform(source: string, id: string) {
      if (matchId(id)) {
        const imports = findStyleImports(source)
        if (imports.length) {
          const formatted = formatVariableForStyleImports(source, imports)
          const classVariables = formatted.variables
          source = formatted.source

          source = applyStyleNameTransformer(source, classVariables, reactVariableName)
          source = source.replace(KEEP_STATEMENT, '')

          return {
            code: source,
            map: null
          }
        }
      }
    }
  }]
}

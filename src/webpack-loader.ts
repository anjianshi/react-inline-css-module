import type { LoaderContext } from 'webpack'
import { findStyleImports, formatVariableForStyleImports, importStyleNameTransformer, applyStyleNameTransformer } from './handle-style-name'


interface Options {
  reactVariableName?: string
}


export default async function ReactInlineCSSModuleLoader(this: LoaderContext<Options>, source: string) {
  const imports = findStyleImports(source)
  if (!imports) return source

  const formatted = formatVariableForStyleImports(source, imports)
  const classVariables = formatted.variables
  source = formatted.source

  source = importStyleNameTransformer(source)

  const { reactVariableName = 'React' } = this.getOptions()
  source = applyStyleNameTransformer(source, classVariables, reactVariableName)

  return source
}

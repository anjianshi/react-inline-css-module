import type { LoaderContext } from 'webpack'
import matchStyleImports from './matchStyleImports'
import type { MatchOptions } from './matchStyleImports'


export default async function ReactInlineCSSModuleLoader(this: LoaderContext<MatchOptions>, source: string) {
  return matchStyleImports(source, this.getOptions())
}

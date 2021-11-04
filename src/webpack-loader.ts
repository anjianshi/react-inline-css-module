import type { LoaderContext } from 'webpack'
import { importStyleNameTransformer, handleStyleName } from './handle-style-name'
import type { Options } from './handle-style-name'


export default async function ReactInlineCSSModuleLoader(this: LoaderContext<Options>, source: string) {
  source = importStyleNameTransformer(source)
  return handleStyleName(source, this.getOptions())
}

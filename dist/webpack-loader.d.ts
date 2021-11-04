import type { LoaderContext } from 'webpack';
import type { Options } from './handle-style-name';
export default function ReactInlineCSSModuleLoader(this: LoaderContext<Options>, source: string): Promise<string | undefined>;

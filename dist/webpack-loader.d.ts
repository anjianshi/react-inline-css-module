import type { LoaderContext } from 'webpack';
import type { MatchOptions } from './matchStyleImports';
export default function ReactInlineCSSModuleLoader(this: LoaderContext<MatchOptions>, source: string): Promise<string>;

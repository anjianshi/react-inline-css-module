import type { LoaderContext } from 'webpack';
interface Options {
    reactVariableName?: string;
}
export default function ReactInlineCSSModuleLoader(this: LoaderContext<Options>, source: string): Promise<string>;
export {};

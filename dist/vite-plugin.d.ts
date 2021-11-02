import type { MatchOptions } from './matchStyleImports';
export default function reactInlineCSSModulePlugin(options?: MatchOptions): {
    name: string;
    enforce: string;
    transform(source: string, id: string): {
        code: string;
        map: null;
    } | undefined;
};

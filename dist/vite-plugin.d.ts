import type { MatchOptions } from './matchStyleImports';
export default function reactInlineCSSModulePlugin(options?: MatchOptions): {
    name: string;
    enforce: "post";
    transform(source: string, id: string): {
        code: string;
        map: null;
    } | undefined;
};

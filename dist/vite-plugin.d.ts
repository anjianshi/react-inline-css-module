import type { Options } from './handle-style-name';
export default function reactInlineCSSModulePlugins(options?: Options): ({
    name: string;
    enforce: "pre";
    transform(source: string, id: string): {
        code: string;
        map: null;
    } | undefined;
} | {
    name: string;
    enforce: "post";
    transform(source: string, id: string): {
        code: string | undefined;
        map: null;
    } | undefined;
})[];

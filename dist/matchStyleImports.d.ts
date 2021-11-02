export interface MatchOptions {
    ReactVariableName?: string;
}
export interface MatchedStyleImport {
    statement: string;
    prefix: string;
    variable?: string;
    filepath: string;
}
export default function matchStyleImports(source: string, options: MatchOptions): string;

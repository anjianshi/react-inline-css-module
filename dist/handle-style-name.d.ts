/**
 * 找出代码中引入的样式文件
 */
interface StyleImport {
    statement: string;
    prefixStatement: string;
    variable?: string;
    filepath: string;
}
export declare function findStyleImports(source: string): StyleImport[];
/**
 * 给没指定变量名的样式引入补充上变量名
 */
export declare function formatVariableForStyleImports(source: string, imports: StyleImport[]): {
    variables: string[];
    source: string;
};
/**
 * 将 styleName 转换函数引入代码
 */
export declare function importStyleNameTransformer(source: string): string;
/**
 * 用 styleName 转换函数包裹原 React.createElement() 调用
 */
export declare function applyStyleNameTransformer(source: string, classVariables: string[], reactVariableName: string): string;
export {};

/**
 * 将 styleName 转换函数引入代码
 */
export declare function importStyleNameTransformer(source: string): string;
/**
 * 找出代码中的样式引用，用带上样式引用信息的 styleNameTransformer 包裹原 React.createElement 调用
 */
export interface Options {
    ReactVariableName?: string;
}
export declare function handleStyleName(source: string, options: Options): string | undefined;

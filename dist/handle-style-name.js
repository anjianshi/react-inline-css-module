"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyStyleNameTransformer = exports.importStyleNameTransformer = exports.formatVariableForStyleImports = exports.findStyleImports = void 0;
function findStyleImports(source) {
    const pattern = /(^|\n)\s*import(?:\s+(.+?)\s+from)?\s+(?:'|")(.+?\.module\.(?:css|less|sass|scss))(?:'|");?/g;
    return [...source.matchAll(pattern)]
        .map(([statement, prefixStatement, variable, filepath]) => ({ statement, prefixStatement, variable, filepath }));
}
exports.findStyleImports = findStyleImports;
/**
 * 给没指定变量名的样式引入补充上变量名
 */
function formatVariableForStyleImports(source, imports) {
    for (const info of imports) {
        if (!info.variable) {
            const variable = makeVariableName();
            info.variable = variable;
            source = source.replace(info.statement, `${info.prefixStatement}import ${variable} from '${info.filepath}';`);
        }
    }
    return {
        variables: imports.map(info => info.variable),
        source
    };
}
exports.formatVariableForStyleImports = formatVariableForStyleImports;
let nextId = 1;
function makeVariableName() {
    return `__cls_${nextId++}`;
}
/**
 * 将 styleName 转换函数引入代码
 */
function importStyleNameTransformer(source) {
    return "import TransformStyleNameCreateElement from 'react-inline-css-module/dist/TransformStyleNameCreateElement';\n" + source;
}
exports.importStyleNameTransformer = importStyleNameTransformer;
/**
 * 用 styleName 转换函数包裹原 React.createElement() 调用
 */
function applyStyleNameTransformer(source, classVariables, reactVariableName) {
    source = source.replace(new RegExp(`${reactVariableName}\\.createElement\\(`, 'g'), `TransformStyleNameCreateElement(${reactVariableName}, [${classVariables.join(',')}], `);
    return source;
}
exports.applyStyleNameTransformer = applyStyleNameTransformer;

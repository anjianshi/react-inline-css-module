"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStyleName = exports.importStyleNameTransformer = void 0;
/**
 * 将 styleName 转换函数引入代码
 */
function importStyleNameTransformer(source) {
    return "import TransformStyleNameCreateElement from 'react-inline-css-module/dist/TransformStyleNameCreateElement';\n" + source;
}
exports.importStyleNameTransformer = importStyleNameTransformer;
function handleStyleName(source, options) {
    const { ReactVariableName = 'React' } = options;
    const matched = matchStyleImports(source);
    if (matched === null)
        return;
    const classVariables = matched.variables;
    source = matched.source;
    source = source.replace(new RegExp(`${ReactVariableName}\\.createElement\\(`, 'g'), `TransformStyleNameCreateElement(${ReactVariableName}, [${classVariables.join(',')}], `);
    return source;
}
exports.handleStyleName = handleStyleName;
let nextId = 1;
function makeVariableName() {
    return `__cls_${nextId++}`;
}
function matchStyleImports(source) {
    const pattern = /(^|\n)\s*import(?:\s+(.+?)\s+from)?\s+(?:'|")(.+?\.module\.(?:css|less|sass|scss))(?:'|");?/g;
    const imports = [...source.matchAll(pattern)]
        .map(([statement, prefixStatement, variable, filepath]) => ({ statement, prefixStatement, variable, filepath }));
    if (imports.length) {
        for (const info of imports) {
            if (!info.variable) {
                const variable = makeVariableName();
                info.variable = variable;
                source = source.replace(info.statement, `${info.prefixStatement}import ${variable} from '${info.filepath}';`);
            }
        }
    }
    return imports.length ? {
        variables: imports.map(info => info.variable),
        source
    } : null;
}

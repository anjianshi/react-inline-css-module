"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handle_style_name_1 = require("./handle-style-name");
function matchId(id) {
    return id.endsWith('tsx') || id.endsWith('jsx');
}
const KEEP_STATEMENT = `console.log(TransformStyleNameCreateElement)`; // 用来保证前一个插件引入的 TransformStyleNameCreateElement() 不会因依赖分析被移除
function reactInlineCSSModulePlugins(options = {}) {
    const { reactVariableName = 'React' } = options;
    return [{
            name: 'react-inline-css-module-import',
            enforce: 'pre',
            transform(source, id) {
                if (matchId(id) && (0, handle_style_name_1.findStyleImports)(source).length) {
                    return {
                        code: (0, handle_style_name_1.importStyleNameTransformer)(source) + '\n;\n' + KEEP_STATEMENT + ';\n',
                        map: null
                    };
                }
            }
        },
        {
            name: 'react-inline-css-module-transform',
            enforce: 'post',
            transform(source, id) {
                if (matchId(id)) {
                    const imports = (0, handle_style_name_1.findStyleImports)(source);
                    if (imports.length) {
                        const formatted = (0, handle_style_name_1.formatVariableForStyleImports)(source, imports);
                        const classVariables = formatted.variables;
                        source = formatted.source;
                        source = (0, handle_style_name_1.applyStyleNameTransformer)(source, classVariables, reactVariableName);
                        source = source.replace(KEEP_STATEMENT, '');
                        return {
                            code: source,
                            map: null
                        };
                    }
                }
            }
        }];
}
exports.default = reactInlineCSSModulePlugins;

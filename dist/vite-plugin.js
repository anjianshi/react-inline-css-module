"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handle_style_name_1 = require("./handle-style-name");
function matchId(id) {
    return id.endsWith('tsx') || id.endsWith('jsx');
}
var KEEP_STATEMENT = "console.log(TransformStyleNameCreateElement)"; // 用来保证前一个插件引入的 TransformStyleNameCreateElement() 不会因依赖分析被移除
function reactInlineCSSModulePlugins(options) {
    if (options === void 0) { options = {}; }
    var _a = options.reactVariableName, reactVariableName = _a === void 0 ? 'React' : _a;
    return [{
            name: 'react-inline-css-module-import',
            enforce: 'pre',
            transform: function (source, id) {
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
            transform: function (source, id) {
                if (matchId(id)) {
                    var imports = (0, handle_style_name_1.findStyleImports)(source);
                    if (imports.length) {
                        var formatted = (0, handle_style_name_1.formatVariableForStyleImports)(source, imports);
                        var classVariables = formatted.variables;
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

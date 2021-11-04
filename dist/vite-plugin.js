"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handle_style_name_1 = require("./handle-style-name");
function matchId(id) {
    return id.endsWith('tsx') || id.endsWith('jsx');
}
function reactInlineCSSModulePlugins(options = {}) {
    return [{
            name: 'react-inline-css-module-import',
            enforce: 'pre',
            transform(source, id) {
                if (matchId(id)) {
                    return {
                        code: (0, handle_style_name_1.importStyleNameTransformer)(source),
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
                    return {
                        code: (0, handle_style_name_1.handleStyleName)(source, options),
                        map: null
                    };
                }
            }
        }];
}
exports.default = reactInlineCSSModulePlugins;

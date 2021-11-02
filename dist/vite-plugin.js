"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matchStyleImports_1 = __importDefault(require("./matchStyleImports"));
function reactInlineCSSModulePlugin(options = {}) {
    return {
        name: 'react-inline-css-module',
        enforce: 'post',
        transform(source, id) {
            if (id.endsWith('tsx') || id.endsWith('jsx')) {
                return {
                    code: (0, matchStyleImports_1.default)(source, options),
                    map: null
                };
            }
        }
    };
}
exports.default = reactInlineCSSModulePlugin;

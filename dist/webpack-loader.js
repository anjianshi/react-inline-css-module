"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matchStyleImports_1 = __importDefault(require("./matchStyleImports"));
async function ReactInlineCSSModuleLoader(source) {
    return (0, matchStyleImports_1.default)(source, this.getOptions());
}
exports.default = ReactInlineCSSModuleLoader;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handle_style_name_1 = require("./handle-style-name");
async function ReactInlineCSSModuleLoader(source) {
    source = (0, handle_style_name_1.importStyleNameTransformer)(source);
    return (0, handle_style_name_1.handleStyleName)(source, this.getOptions());
}
exports.default = ReactInlineCSSModuleLoader;

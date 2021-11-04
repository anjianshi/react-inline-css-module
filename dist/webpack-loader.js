"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handle_style_name_1 = require("./handle-style-name");
async function ReactInlineCSSModuleLoader(source) {
    const imports = (0, handle_style_name_1.findStyleImports)(source);
    if (!imports)
        return source;
    const formatted = (0, handle_style_name_1.formatVariableForStyleImports)(source, imports);
    const classVariables = formatted.variables;
    source = formatted.source;
    source = (0, handle_style_name_1.importStyleNameTransformer)(source);
    const { reactVariableName = 'React' } = this.getOptions();
    source = (0, handle_style_name_1.applyStyleNameTransformer)(source, classVariables, reactVariableName);
    return source;
}
exports.default = ReactInlineCSSModuleLoader;

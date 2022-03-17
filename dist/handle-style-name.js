"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyStyleNameTransformer = exports.importStyleNameTransformer = exports.formatVariableForStyleImports = exports.findStyleImports = void 0;
function findStyleImports(source) {
    var pattern = /(^|\n)\s*import(?:\s+(.+?)\s+from)?\s+(?:'|")(.+?\.module\.(?:css|less|sass|scss))(?:'|");?/g;
    return __spreadArray([], __read(source.matchAll(pattern)), false).map(function (_a) {
        var _b = __read(_a, 4), statement = _b[0], prefixStatement = _b[1], variable = _b[2], filepath = _b[3];
        return ({ statement: statement, prefixStatement: prefixStatement, variable: variable, filepath: filepath });
    });
}
exports.findStyleImports = findStyleImports;
/**
 * 给没指定变量名的样式引入补充上变量名
 */
function formatVariableForStyleImports(source, imports) {
    var e_1, _a;
    try {
        for (var imports_1 = __values(imports), imports_1_1 = imports_1.next(); !imports_1_1.done; imports_1_1 = imports_1.next()) {
            var info = imports_1_1.value;
            if (!info.variable) {
                var variable = makeVariableName();
                info.variable = variable;
                source = source.replace(info.statement, info.prefixStatement + "import " + variable + " from '" + info.filepath + "';");
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (imports_1_1 && !imports_1_1.done && (_a = imports_1.return)) _a.call(imports_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        variables: imports.map(function (info) { return info.variable; }),
        source: source
    };
}
exports.formatVariableForStyleImports = formatVariableForStyleImports;
var nextId = 1;
function makeVariableName() {
    return "__cls_" + nextId++;
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
    source = source.replace(
    // 另两种包裹函数名的由来见：https://www.typescriptlang.org/docs/handbook/jsx.html
    new RegExp("(" + reactVariableName + "\\.createElement|_jsx|_jsxDEV)\\(", 'g'), "TransformStyleNameCreateElement($1, [" + classVariables.join(',') + "], ");
    return source;
}
exports.applyStyleNameTransformer = applyStyleNameTransformer;

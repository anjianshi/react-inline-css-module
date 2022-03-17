"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
function TransformStyleNameCreateElement(origCreateElement, classVariables, name, rawProps) {
    var extra = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        extra[_i - 4] = arguments[_i];
    }
    var props = __assign({}, rawProps);
    // 此判断同时确定了 styleName 不为空，且类型是字符串（但有可能是空字符串）
    // styleName 是空字符串时也有必要走到 if 判断内部，因为需要删除 props 里的 styleName 属性（不然 React 会出现警告）
    if (typeof props.styleName === 'string') {
        props.className = props.styleName
            .split(' ')
            .reduce(function (classNames, styleName) { return (__spreadArray(__spreadArray([], __read(classNames), false), __read(classVariables.map(function (variable) { return variable[styleName]; })), false)); }, [props.className])
            .filter(function (v) { return v; })
            .join(' ');
        delete props.styleName;
    }
    return origCreateElement.apply(void 0, __spreadArray([name, props], __read(extra), false));
}
exports.default = TransformStyleNameCreateElement;

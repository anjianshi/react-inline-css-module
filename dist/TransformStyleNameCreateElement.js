"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TransformStyleNameCreateElement(ReactVariable, classVariables, name, rawProps, ...extra) {
    const props = { ...rawProps };
    if (props.styleName) {
        props.className = props.styleName
            .split(' ')
            .reduce((classNames, styleName) => ([
            ...classNames,
            ...classVariables.map(variable => variable[styleName])
        ]), [props.className])
            .filter(v => v)
            .join(' ');
        delete props.styleName;
    }
    return ReactVariable.createElement(name, props, ...extra);
}
exports.default = TransformStyleNameCreateElement;

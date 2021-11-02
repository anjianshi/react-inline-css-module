interface ReactLike {
  createElement(name: string, props: any, ...extra: any[]): any
}

interface StyleProps {
  className?: string,
  styleName?: string,
}


export default function TransformStyleNameCreateElement<Props extends StyleProps>(
  ReactVariable: ReactLike,
  classVariables: { [name: string]: string }[],
  name: string,
  rawProps: Props,
  ...extra: any[]
) {
  const props = {...rawProps}
  if (props.styleName) {
    props.className = props.styleName
      .split(' ')
      .reduce((classNames, styleName) => ([
        ...classNames,
        ...classVariables.map(variable => variable[styleName])
      ]), [props.className])
      .filter(v => v)
      .join(' ')
    delete props.styleName
  }
  return ReactVariable.createElement(name, props, ...extra)
}

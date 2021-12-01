interface StyleProps {
  className?: string,
  styleName?: string,
}


export default function TransformStyleNameCreateElement<Props extends StyleProps>(
  origCreateElement: (name: string, props: any, ...extra: any[]) => any,
  classVariables: { [name: string]: string }[],
  name: string,
  rawProps: Props,
  ...extra: any[]
) {
  const props = {...rawProps}
  // 此判断同时确定了 styleName 不为空，且类型是字符串（但有可能是空字符串）
  // styleName 是空字符串时也有必要走到 if 判断内部，因为需要删除 props 里的 styleName 属性（不然 React 会出现警告）
  if (typeof props.styleName === 'string') {
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
  return origCreateElement(name, props, ...extra)
}

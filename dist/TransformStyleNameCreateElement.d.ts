interface StyleProps {
    className?: string;
    styleName?: string;
}
export default function TransformStyleNameCreateElement<Props extends StyleProps>(origCreateElement: (name: string, props: any, ...extra: any[]) => any, classVariables: {
    [name: string]: string;
}[], name: string, rawProps: Props, ...extra: any[]): any;
export {};

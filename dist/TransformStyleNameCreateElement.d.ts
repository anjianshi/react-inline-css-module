interface ReactLike {
    createElement(name: string, props: any, ...extra: any[]): any;
}
interface StyleProps {
    className?: string;
    styleName?: string;
}
export default function TransformStyleNameCreateElement<Props extends StyleProps>(ReactVariable: ReactLike, classVariables: {
    [name: string]: string;
}[], name: string, rawProps: Props, ...extra: any[]): any;
export {};

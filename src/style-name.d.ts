// 支持识别 styleName 属性
import 'react'
declare module 'react' {
  interface Attributes {
    styleName?: string
  }
  interface HTMLAttributes<T> {
    styleName?: string
  }
  interface SVGAttributes<T> {
    styleName?: string
  }
}

// 解决部分 antd 组件传入 styleName 属性会报类型错误的问题
declare global {
  namespace JSX {
    export interface IntrinsicAttributes {
      styleName?: string
    }
  }
}

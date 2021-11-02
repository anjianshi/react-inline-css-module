import matchStyleImports from './matchStyleImports'
import type { MatchOptions } from './matchStyleImports'


export default function reactInlineCSSModulePlugin(options: MatchOptions = {}) {
  return {
    name: 'react-inline-css-module',
    enforce: 'post',

    transform(source: string, id: string) {
      if (id.endsWith('tsx') || id.endsWith('jsx')) {
        return {
          code: matchStyleImports(source, options),
          map: null
        }
      }
    }
  }
}

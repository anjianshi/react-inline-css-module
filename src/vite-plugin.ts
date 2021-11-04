import { importStyleNameTransformer, handleStyleName } from './handle-style-name'
import type { Options } from './handle-style-name'


function matchId(id: string) {
  return id.endsWith('tsx') || id.endsWith('jsx')
}


export default function reactInlineCSSModulePlugins(options: Options = {}) {
  return [{
    name: 'react-inline-css-module-import',
    enforce: 'pre' as 'pre',
    transform(source: string, id: string) {
      if (matchId(id)) {
        return {
          code: importStyleNameTransformer(source),
          map: null
        }
      }
    }
  },
  {
    name: 'react-inline-css-module-transform',
    enforce: 'post' as 'post',
    transform(source: string, id: string) {
      if (matchId(id)) {
        return {
          code: handleStyleName(source, options),
          map: null
        }
      }
    }
  }]
}

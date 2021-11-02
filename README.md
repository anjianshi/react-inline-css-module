# react-inline-css-module

Auto transform CSS Module class name for React with Webpack or Vite.

Like [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules), but more easy to use.

1. Support Webpack and Vite
2. Support import multiple style files

## Webpack Configuration
```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          // options are optional
          { loader: 'react-inline-css-module/dist/webpack-loader', options: { ReactVariableName: 'React' } },

          // other loaders, eg babel-loader
          ...
        ]
      }
    ]
  }
  ...
}
```

## Vite Configuration
```javascript
const reactInlineCSSModulePlugin = require('react-inline-css-module/dist/vite-plugin')

module.exports = {
  ...
  plugins: [
    reactInlineCSSModulePlugin({ ReactVariableName: 'React' })    // options are optional
  ]
  ...
}
```


## App Code Example

### app.module.css
```css
.app {
  color: #777;
}

.info {
  color: green;
}
```

### App.tsx
```js
import './app.module.css'

function App() {
  return <div styleName="app">
    <div>content</div>
    <div styleName="info">info</div>
  </div>
}
```

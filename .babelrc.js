const { BABEL_ENV } = process.env;

module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        modules: false,
        loose: true
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    BABEL_ENV === 'cjs' && '@babel/plugin-transform-modules-commonjs'
  ].filter(Boolean),
  env: {
    test: {
      presets: [['@babel/env'], '@babel/react']
    }
  }
}

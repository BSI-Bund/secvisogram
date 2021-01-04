module.exports = {
  env: {
    development: {
      presets: [
        ['@babel/preset-env', { modules: false, targets: { esmodules: true } }],
        '@babel/preset-react',
      ],
    },
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
      ],
    },
    production: {
      presets: [
        ['@babel/preset-env', { modules: false, targets: { esmodules: true } }],
        '@babel/preset-react',
      ],
    },
  },
}

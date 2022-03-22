module.exports = {
  env: {
    development: {
      presets: [
        ['@babel/preset-env', { modules: false, targets: { esmodules: true } }],
        '@babel/preset-react',
      ],
      compact: false,
    },
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
      ],
      compact: true,
    },
    production: {
      presets: [
        ['@babel/preset-env', { modules: false, targets: { esmodules: true } }],
        '@babel/preset-react',
      ],
      compact: true,
    },
  },
}

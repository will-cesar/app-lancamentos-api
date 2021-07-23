module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', { 
      alias: {
        '@config': './src/config',
        '@controllers': './src/api/controllers/',
        '@entities': './src/api/entities/',
        '@enums': './src/api/enums/',
        '@interfaces': './src/api/interfaces/',
        '@middlewares': './src/api/middlewares/',
        '@repositories': './src/api/repositories/',
        '@routes': './src/api/routes/',
        '@services': './src/api/services/',
        '@validations': './src/api/validations/'
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose' : true }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
};

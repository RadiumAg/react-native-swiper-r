const path = require('path');
const pak = require('../package.json');

module.exports = function (api) {
  api.cache(true);
  const plugins = [
    [
      'add-module-exports',
      {
        addDefaultProperty: true,
      },
    ],
    'react-native-reanimated/plugin',
    'inline-dotenv',
    '@babel/plugin-syntax-dynamic-import',
    'import-glob',
  ];

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            [pak.name]: path.join(__dirname, '..', pak.main),
          },
        },
      ],
      ...plugins,
    ],
  };
};

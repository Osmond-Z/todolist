const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1CAD5E',
              '@text-color': '#1CAD5E',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
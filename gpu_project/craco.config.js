const CracoLessPlugin = require('craco-less');
const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve("src"),
      "@components": path.resolve("src/components"),
      "@api": path.resolve("src/api"),
      "@assets": path.resolve("src/assets"),
      "@config": path.resolve("src/config"),
      "@utils": path.resolve("src/utils"),
    }
  },
  style: {
    postOptions: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#027AFF' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ]
};
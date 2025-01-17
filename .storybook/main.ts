const webpack = require('webpack');

/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|mjs|ts)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  staticDirs: ['./public'],
  webpackFinal: async (config) => {
    config.devtool = false;
    config.plugins.push(
      new webpack.SourceMapDevToolPlugin({
        append: '\n//# sourceMappingURL=[url]',
        fileContext: './',
        filename: '[file].map',
      }),
    );
    return config;
  },
};
export default config;

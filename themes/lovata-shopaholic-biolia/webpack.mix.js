const mix = require('laravel-mix');
const stylelint = require('laravel-mix-stylelint');
const eslint = require('laravel-mix-eslint');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssNested = require('postcss-nested');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');

const cssFileList = [
  'common',
  'pages/news-page',
  'pages/product',
  'pages/checkout',
  'pages/contact',
  // add CSS files from pages folder
];

const jsFileList = [
  'common',
  'pages/catalog',
  'pages/product',
  'pages/checkout',
  'pages/contact',
  // add JS files from pages folder
];

const THEME_NAME = 'lovata-shopaholic-biolia';

const isLocal = process.env.LOCAL_DEV || false;

mix.options({
  clearConsole: true,
});

mix.setPublicPath(`themes/${THEME_NAME}/assets/`);
mix.webpackConfig(webpack => ({
  plugins: [
    new StyleLintPlugin({
      files: [`./themes/${THEME_NAME}/partials/**/*.css`, `./themes/${THEME_NAME}/css/**/*.css`],
      configFile: '.stylelintrc',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
  ],
}));
mix.stylelint();

cssFileList.forEach((fileName) => {
  mix.postCss(`./themes/${THEME_NAME}/${fileName}.css`, 'css',
    [
      postcssImport(),
      postcssUrl({
        url: 'rebase',
      }),
      postcssNested(),
      postcssPresetEnv({
        stage: 3,
        features: {
          'nesting-rules': true,
        },
      }),
      autoprefixer(),
    ]);
});

jsFileList.forEach(fileName => mix.js(`./themes/${THEME_NAME}/${fileName}.js`, 'js'));

mix.sourceMaps(true, 'source-map');

mix.eslint({
  fix: true,
  cache: false,
  failOnError: false,
  configFile: isLocal ? '.local.eslintrc' : '.eslintrc',
});

mix.extract(['jquery']);

mix.version();

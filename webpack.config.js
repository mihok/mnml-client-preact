const webpack = require('webpack');
const path = require('path');

const ReplacePlugin = require('replace-bundle-webpack-plugin');

const config = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const development = ENV !== 'production';

const PATHS = {
  BUILD: path.join(__dirname, '/dist'),
  SRC: path.join(__dirname, '/src'),
  MODULES: path.join(__dirname, '/node_modules'),
};

let plugins = [
  // TODO: What does this do?
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.EnvironmentPlugin(['NODE_ENV', 'PORT', 'REMOTE_HOST','REMOTE_PORT'])
];

if (!development) {
  // Minify source on production only
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,
    },
    // TODO: What are all these options?
    compress: {
      unsafe_comps: true,
      properties: true,
      keep_fargs: false,
      pure_getters: true,
      collapse_vars: true,
      unsafe: true,
      warnings: false,
      screw_ie8: true,
      sequences: true,
      dead_code: true,
      drop_debugger: true,
      comparisons: true,
      conditionals: true,
      evaluate: true,
      booleans: true,
      loops: true,
      unused: true,
      hoist_funs: true,
      if_return: true,
      join_vars: true,
      cascade: true,
      drop_console: true,
    }
   }));

  // Strip out babel-helper invariant checks 
  plugins.push(new ReplacePlugin([
    {
      // This is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
      partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
      replacement: () => 'return;(',
    },
  ]));
}

module.exports = { 
  context: PATHS.SRC,
  entry: PATHS.SRC + '/index.js',
  output: {
    filename: `mnml${!development ? `-${config.version}` : ''}${!development ? '.min' : ''}.js`,
    path: PATHS.BUILD,
    publicPath: '/',
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   exclude: [ PATHS.SRC ],
      //   enforce: 'pre',
      //   use: 'source-map-loader',
      // },
      { 
        test: /\.jsx?$/,
        include: [ PATHS.SRC ],
        exclude: [ PATHS.MODULES ],
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015', 'stage-0' ],
          plugins: [
            'transform-decorators-legacy',
            [ 'transform-react-jsx', { 'pragma': 'h' } ],
          ],
        },  
      },
      {
        test: /\.css$/,
        include: [ PATHS.SRC ],
        exclude: [ PATHS.MODULES ],
        loader: 'style-loader!css-loader',
      },
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader',
      // },
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   use: 'babel-loader',
      // },
      // {
      //   test: /\.json$/,
      //   use: 'json-loader',
      // },
      // {
      //   test: /\.(xml|html|txt|md)$/,
      //   use: 'raw-loader',
      // },
      // {
      //   test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      //   // use: ENV === "production" ? "file-loader" : "url-loader"
      //   use: 'url-loader',
      // },
    ],
  },
  plugins: plugins,
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [
      // path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
    alias: {
      'components': path.resolve(__dirname, 'src/components'), // used for tests
      // style: path.resolve(__dirname, 'src/style'),
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },

  // TODO: What is cheap-module-eval-source-map?
  devtool: development ? 'source-map' : false,
  devServer: {
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost',
    publicPath: '/',
    contentBase: './example',
    // TODO: What his history API fallback?
    historyApiFallback: true,
  }
};

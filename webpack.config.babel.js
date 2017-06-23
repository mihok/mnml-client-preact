import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
import path from 'path';
const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV !== 'production';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.less'],
    modules: [
      path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
    alias: {
      components: path.resolve(__dirname, 'src/components'), // used for tests
      style: path.resolve(__dirname, 'src/style'),
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'src'),
        enforce: 'pre',
        use: 'source-map-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(xml|html|txt|md)$/,
        use: 'raw-loader',
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        // use: ENV === "production" ? "file-loader" : "url-loader"
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'PORT', 'REMOTE_HOST'])
  ].concat(
    ENV === 'production'
      ? [
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false,
          },
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
          },
        }),

          // strip out babel-helper invariant checks
        new ReplacePlugin([
          {
              // this is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
            partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
            replacement: () => 'return;(',
          },
        ]),
      ]
      : [],
  ),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },

  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
		port: process.env.PORT || 8080,
		host: process.env.HOST || 'localhost',
		publicPath: '/',
		contentBase: './build',
		historyApiFallback: true,
		open: true,
		proxy: {
			// OPTIONAL: proxy configuration:
			// '/optional-prefix/**': { // path pattern to rewrite
			//   target: 'http://target-host.com',
			//   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
			// }
		}
	}
};

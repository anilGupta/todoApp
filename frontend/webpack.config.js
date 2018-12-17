const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
      }),
      CopyAssetPluginConfig = new CopyWebpackPlugin([
        { from: './src/assets', to: './assets' },
      ]),
      autoprefixer      = require('autoprefixer'),
      ExtractTextPluginConfig = new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: false });

module.exports = {
  entry: {
    main : ['./src/index.js','./src/assets/styles/style.scss'],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'prop-types',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/
      },
      {
          test: /\.scss$/, exclude: /node_modules/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader', { loader: 'sass-loader', query: { sourceMap: false } }, ], }),
      },
      { test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'}),
    ExtractTextPluginConfig,
    HtmlWebpackPluginConfig,
    CopyAssetPluginConfig,
  ],
  //devtool: 'cheap-source-map',
  target: 'web'
};

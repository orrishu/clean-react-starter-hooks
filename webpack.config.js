const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //extract-text-webpack-plugin replacement
const TerserPlugin = require('terser-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const relpath = path.join.bind(path, __dirname)

const NODE_ENV = process.env.NODE_ENV || 'development'
const isTestEnv = NODE_ENV === 'test'
const isProductionCode = NODE_ENV === 'production'
const isDevelopmentServer = NODE_ENV == 'development'
const ASSET_PATH = process.env.ASSET_PATH || '/'
const API_BASEURL = process.env.API_BASEURL

const paths = {
  dist: relpath(`./dist/${NODE_ENV}`),
  appEntry: relpath('./src/app/index'),
  indexHtml: relpath('./src/app/index.html'),
  src: relpath('./src'),
  lib: relpath('./node_modules')
}

module.exports = {
  mode: isProductionCode ? 'production' : 'development',
  devServer: {
    compress: true,
    hot: true,
    port: process.env.PORT || '7777',
    historyApiFallback: true,
    disableHostCheck: true
  },
  context: path.resolve(__dirname, 'src'),
  devtool: getSourceMap(),
  bail: !isDevelopmentServer,
  entry: getEntryPoints(),
  output: {
    path: paths.dist,
    filename: '[name].[hash].bundle.js',
    publicPath: ASSET_PATH
  },
  plugins: getPlugins(),
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    //,extensions: ['.js', '.jsx', '.scss', '.less']
    alias: { 
      'react-dom': '@hot-loader/react-dom' 
    }
  },  
  optimization: {
    minimizer: [
      new TerserPlugin({
        include: paths.src,
        terserOptions: {
          ecma: 6,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopmentServer
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                context: process.cwd()   //note: must match react-css-modules context. this is a default that I could not fix
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              generateScopedName: '[path]___[name]__[local]___[hash:base64:5]',
              plugins: [
                require('autoprefixer')(),
				        require('cssnano')()
              ]
            }
          },
          'sass-loader'
        ]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDevelopmentServer
          }
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }]
      }, {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.jsx?$/,
        include: paths.src,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react' /*, '@babel/preset-env'*/]
            }
          }
        ]
      }, {
        test: /\.yaml$/,
        use: [
          {
            loader: 'yaml-loader'
          }
        ],
        include: paths.src
      },
      {
        test: /\.(png|gif|jpg|jpeg|eot|otf|woff|ttf|svg)?$/,
        loaders: ['url-loader'],
        include: paths.src
      }
    ]
  }
}

function getSourceMap() {
  // TestEnv source-maps:
  // cheap-module-source-map - fastest that works in the console
  // inline-source-map - works in chrome (for debugging)
  return isTestEnv ? 'inline-source-map' :
    isDevelopmentServer ? 'eval-source-map' :
      'source-map'
}

function getEntryPoints() {
  return isDevelopmentServer
    ? [
      '@babel/polyfill',
      'react-hot-loader/patch',
      paths.appEntry
    ]
    :
    [
      '@babel/polyfill',  //IE ...
      paths.appEntry
    ]
}

function getPlugins() {
  let plugins = [
    new CleanWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: `html-loader!${paths.indexHtml}`,
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
        'ASSET_PATH': JSON.stringify(ASSET_PATH),
        'API_BASEURL': JSON.stringify(API_BASEURL)
      }
    })
  ]

  plugins = plugins.concat([
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDevelopmentServer ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopmentServer ? '[id].css' : '[id].[hash].css'
    })
  ])

  plugins = plugins.concat([
    isDevelopmentServer ?
      new webpack.HotModuleReplacementPlugin()
      :
      new TerserPlugin()
  ])

  if (isDevelopmentServer) {
    plugins = plugins.concat([new DashboardPlugin()])
  }

  /*
  if (isDevelopmentServer) {
    plugins = plugins.concat([
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new webpack.HotModuleReplacementPlugin()
    ])
  }

  if (isProductionCode) {
    plugins = plugins.concat([
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      }),
      //new webpack.optimize.OccurenceOrderPlugin()
      new UglifyJsPlugin()
    ])
  }*/

  return plugins
}

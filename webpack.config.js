const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: path.join(__dirname, './src/client/index.ts'),
    output: {
      filename: 'app.js',
      path: path.join(__dirname, './build/client/')
    },
    devtool: 'inline-source-map',
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/client/index.html'
      })
    ],
    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ]
    },
    watchOptions: {
      ignored: [
        /target\/.*/
      ]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                babelrc: false,
                presets: [
                  ['env', {
                    targets: {
                      browsers: [
                        'last 3 chrome versions',
                        'last 2 ff versions'
                      ]
                    },
                    useBuiltIns: true,
                    modules: false
                  }]
                ]
              }
            },
            {
              loader: 'awesome-typescript-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.rs$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                compact: true
              }
            },
            {
              loader: 'rust-native-wasm-loader',
              options: {
                release: true,
                wasmBindgen: {
                  wasm2es6js: true
                }
              }
            }
          ]
        }
      ]
    }
  },
  {
    mode: 'development',
    target: 'node',
    entry: path.join(__dirname, './src/server/index.ts'),
    output: {
      filename: 'index.js',
      path: path.join(__dirname, './build/server/')
    },
    devtool: 'inline-source-map',
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
      })
    ],
    node: {
      __dirname: false,
      __filename: false,
      console: true
    },
    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ]
    },
    externals: [require('webpack-node-externals')()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                babelrc: false,
                presets: [
                  ['env', {
                    targets: {
                      node: 'current'
                    },
                    modules: false
                  }]
                ]
              }
            },
            {
              loader: 'awesome-typescript-loader'
            }
          ]
        }
      ]
    }
  }
];

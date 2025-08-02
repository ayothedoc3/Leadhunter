import path from 'path';
import { fileURLToPath } from 'url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  target: 'webworker',
  entry: './src/worker/index.ts',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist', 'worker-build'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      fs: false,
      path: false,
      os: false,
      util: false,
      zlib: false,
      'node:os': false,
      'node:util': false,
      'node:zlib': false,
      'node:events': false,
      'node:perf_hooks': false,
      'node:stream': false,
      'node:tty': false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  externals: [],
};

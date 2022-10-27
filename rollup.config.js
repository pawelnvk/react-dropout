import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import livereload from 'rollup-plugin-livereload';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

const { ENVIRONMENT } = process.env;

const isDevelopment = ENVIRONMENT === 'development';
const isProduction = ENVIRONMENT === 'production';
const isTesting = ENVIRONMENT === 'testing';
const isDevelopmentOrTesting = isDevelopment || isTesting;
const esFormat = {
  file: 'dist/Dropout.js',
  format: 'es',
};
const iifeFormat = {
  file: 'dist/Dropout.js',
  format: 'iife',
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
  },
  name: 'Dropout',
};

export default {
  input: 'src/index.js',
  output: [
    isProduction && esFormat,
    isDevelopmentOrTesting && iifeFormat,
  ].filter((x) => x),
  // All the used libs needs to be here
  external: ['react', 'prop-types'],
  plugins: [
    eslint({
      throwOnError: isProduction,
      throwOnWarning: isProduction,
    }),
    isDevelopmentOrTesting &&
      serve({
        contentBase: ['dist', 'demo', 'node_modules/@babel/standalone'],
        historyApiFallback: true,
        port: 3000,
      }),
    isDevelopment && livereload({ watch: ['dist', 'demo'] }),
    nodeResolve(),
    babel({ babelHelpers: 'runtime', exclude: 'node_modules/**' }),
  ].filter((x) => x),
};

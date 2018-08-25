import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  // All the used libs needs to be here
  external: [
    'react',
    'prop-types'
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

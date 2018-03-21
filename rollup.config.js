import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';

const { NODE_ENV } = process.env;

export default {
  input: 'src/index',
  output: {
    name: 'ReactScreenSize',
    globals: {
      'react': 'React',
      'prop-types': 'PropTypes',
    },
  },
  plugins: [].concat(
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true
    }),
    commonjs({
      include: /node_modules/
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    NODE_ENV === 'production'
      ? uglify()
      : []
  ),
  external: ['react', 'prop-types'],
};

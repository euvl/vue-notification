import vue from 'rollup-plugin-vue';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from "rollup-plugin-replace";
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import alias from 'rollup-plugin-alias';
import path from 'path';

export default {
  input: 'src/index.js',
  output:  [
    {
      file: 'dist/index.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
    }
  ],
  plugins: [
    vue({
      preprocessStyles: true,
      css: false,
      compileTemplate: true,
    }),
    typescript({ tsconfig: path.resolve(__dirname, 'tsconfig.json')}),
    replace({
      NODE_ENV: JSON.stringify('production'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    postcss(),
    // css(),
    alias({
      resolve: [ '.js', '.ts', '.tsx' ],
      entries: [
        { find: 'vue', replacement: '@vue/runtime-dom' }
      ]
    }),
    resolve(),
    peerDepsExternal(),
  ],
};

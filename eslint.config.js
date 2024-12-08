import pluginJs from '@eslint/js';
// import { plugin } from 'mongoose';
import simpleimportsort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node
    },
    plugins: {
      'simple-import-sort': simpleimportsort
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  },

  pluginJs.configs.recommended
];

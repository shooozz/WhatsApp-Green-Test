import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import ts from '@typescript-eslint/eslint-plugin';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import sortImports from 'eslint-plugin-simple-import-sort';
import unusedImports from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  prettier,
  {
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      globals: globals.builtin,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.json'
      }
    },
    plugins: {
      react,
      'unicorn': eslintPluginUnicorn,
      'sortImports': sortImports,
      '@typescript-eslint': ts,
      "unused-imports": unusedImports,
    },
    rules: {
      'react/react-in-jsx-scope': 'warn',
      'no-console': 'warn',
      'prefer-const': 'warn',
      'unicorn/better-regex': 'error',
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
        },
      ]
    },
    files: ['**/*.ts', '**/*.tsx']
  }
];

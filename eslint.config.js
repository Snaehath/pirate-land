import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import unicorn from 'eslint-plugin-unicorn'
import react from 'eslint-plugin-react'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unicorn': unicorn,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...unicorn.configs.recommended.rules,
      'semi': ['error', 'always'],
      'quotes': ['error', 'double'],
      'func-style': ['error', 'expression'],
      'indent': ["error", 2],
      'react-refresh/only-export-components': "off",
      'no-multiple-empty-lines': ["error", { "max": 1 }],
      'react/jsx-max-props-per-line': ["error", { "maximum": 1 }],
      'react/jsx-first-prop-new-line': ["error", "multiline"],
      'react/jsx-closing-bracket-location': ["error", "line-aligned"],
      'react/jsx-indent': ["error", 2],
      'react/jsx-indent-props': ["error", 2],
      'react/jsx-one-expression-per-line': ["error", { "allow": "single-child" }],
    },
  },
)
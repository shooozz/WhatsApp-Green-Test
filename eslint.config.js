import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'

export default [
    js.configs.recommended,
    prettier,
    {
        ignores: ['node_modules', 'dist'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        plugins: {
            react
        },
        rules: {
            'no-unused-vars': 'warn',
            'react/react-in-jsx-scope': 'off',
            'no-console': 'warn',
            'prefer-const': 'off',
            'quotes': ['warn', 'single'],
            'jsx-quotes': ['warn', 'prefer-single'],
            'indent': ['warn', 4],
            'max-len': ['error', { code: 160 }],
            'comma-dangle': ['off'],
            'semi': ['off']
        }
    }
]

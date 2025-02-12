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
            'react/react-in-jsx-scope': 'off'
        }
    }
]

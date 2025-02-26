import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist', 'node_modules', 'build', '.turbo', '.next', '.cache'] },
	{
		extends: [
			js.configs.recommended,
			react.configs.recommended,
			...tseslint.configs.recommended,
		],

		files: ['**/*.{ts,tsx,js,jsx}'],

		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser,
		},

		plugins: {
			react: react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'@typescript-eslint': tseslint,
		},

		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'react/no-unknown-property': ['error', { ignore: ['css'] }],
			'react-hooks/exhaustive-deps': 'error',

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-imports': 'warn',
			'@typescript-eslint/strict-boolean-expressions': 'warn',

			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',
		},
	}
);

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
	},
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		files: ['**/*.cjs'],
		languageOptions: {
			sourceType: 'script',
		},
		rules: {
			'global-require': 'off',
			'import/no-commonjs': 'off',
		},
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			globals: globals.node,
		},
		rules: {
			'no-console': 'off',
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'no-process-env': 'off',
			'import/no-unresolved': 'off',
			'prefer-const': 'error',
		},
	},
];

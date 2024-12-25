import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		// Apply settings to all JS/JSX files
		files: ['**/*.{js,mjs,cjs,jsx}'],
		languageOptions: {
			globals: globals.browser,
			ecmaVersion: 'latest', // Ensure the latest ECMAScript support
			sourceType: 'module', // Default to ES Modules for React code
		},
	},
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		// Override settings for CommonJS files
		files: ['**/*.cjs'],
		languageOptions: {
			sourceType: 'script', // Use 'script' for CommonJS
		},
		rules: {
			'global-require': 'off',
			'import/no-commonjs': 'off', // Allow CommonJS imports
		},
	},
];

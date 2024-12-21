import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize-gzbr'
import eol, { eolOutput } from 'rollup-plugin-eol'
import brotli from 'rollup-plugin-brotli'
import { swc as swc3, defineRollupSwcOption, minify, defineRollupSwcMinifyOption } from 'rollup-plugin-swc3'

const targets = '> 0.2%, last 2 years, Firefox ESR, not dead'

const onwarn = function(warning, warn) {
	if (warning.code === 'MISSING_NAME_OPTION_FOR_IIFE_EXPORT') {
		return
	}
	warn(warning)
}

const config = [
	{
		input: 'src/pubsub.js',
		output: [
			{ file: 'dist/pubsub.js', format: 'iife', name: '_0357' },
			{ file: 'dist/pubsub.min.js', format: 'iife', plugins: [minify(), brotli({ options: { level: 11 } }), filesize(), eolOutput()] },
		],
		plugins: [
			resolve({ browser: true }),
			commonjs(),
			swc3(defineRollupSwcOption({
				jsc: { parser: { syntax: 'typescript', jsx: false }, minify: { compress: false, mangle: false } },
				env: { targets, mode: 'usage', coreJs: '3.39' },
			})),
		],
		onwarn,
	},
	{
		input: 'src/pubsub.js',
		output: [
			{ file: 'dist/pubsub.legacy.js', format: 'iife' },
			{ file: 'dist/pubsub.legacy.min.js', format: 'iife', plugins: [minify(), brotli({ options: { level: 11 } }), filesize(), eolOutput()] },
		],
		plugins: [
			resolve({ browser: true }),
			commonjs(),
			swc3(defineRollupSwcOption({
				jsc: { parser: { syntax: 'typescript', jsx: false }, minify: { compress: false, mangle: false } },
				env: { targets: 'last 10 years, ie 6', mode: 'usage', coreJs: '3.39' },
			})),
		],
		onwarn,
	},
]

export default config

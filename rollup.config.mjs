import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: 'dist/index.js',
				format: "cjs",
				sourcemap: true,
			},
			{
				file: 'dist/index.esm.js',
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			resolve({ extensions: ['.js', '.ts'] }),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
				exclude: [
					'dist',
					'node_modules/**',
				]
			}),
			terser(),
			external()
		]
	},
	// Generate TypeScript declaration files
	{
		input: 'dist/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'es' }],
		plugins: [dts()],
	}
];

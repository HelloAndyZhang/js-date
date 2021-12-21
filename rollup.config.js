import NodePath from 'path'
import json from "rollup-plugin-json" //支持从json文件里引入数据
import resolve from "@rollup/plugin-node-resolve" //支持导入其它npm包
import commonjs from "@rollup/plugin-commonjs"//支持编译npm模块以及commonjs模块
import alias from '@rollup/plugin-alias';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser" //压缩代码
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload' // 本地服务
import Package from './package.json'
let plugins = [json(), resolve(), commonjs(), babel({ exclude: 'node_modules/**', runtimeHelpers: true }),];
if (process.env.NODE_ENV == 'production') {
	plugins.push(terser());
}
const resolveFile = path => NodePath.resolve(__dirname, path)
const customResolver = resolve({
	extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss']
});
export default {
	input: resolveFile(Package.source),
	output: [
		{
			file: resolveFile(Package.umdmodule),
			format: 'umd',
			sourcemap: true,
			name:Package.name,//挂载到window的全局变量名，格式为iife/umd时必填   如window.testModule
		},
		{
			file: resolveFile(Package.main),
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: resolveFile(Package.module),
			format: 'es',
			sourcemap: true,
		}
	],
	//插件
	plugins: [
		alias({
			entries: {
				'@': 'src',
				'@utils': 'src/utils/index'
			},
			customResolver,
		}),
		...plugins,
		livereload('dist'),
		// 本地服务器
		serve({
			open: false, // 自动打开页面
			port: 8000,
			openPage: '/public/index.html', // 打开的页面
			contentBase: ''
		}),

	],

	//指定一些库不打入文件中 如 lodash
	external: []
}
/**
 * Created by yan on 16-1-20.
 */
var path = require('path');

module.exports = {
	entry: path.join(__dirname, 'example', 'src', 'index.jsx'),
	output: {
		filename: './example/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			include: [
				path.join(__dirname, 'example')
			]
		}]
	},
	devServer: {
		contentBase: path.join(__dirname, 'example')
	}
}
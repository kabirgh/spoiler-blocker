var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + "/extension/src/panel.html",
	filename: "panel.html",
	inject: "body"
});

var CopyWebpackPluginConfig = new CopyWebpackPlugin([
	{
		from: __dirname + "/extension/src/src_chrome",
		to: __dirname + "/extension/dist_chrome",
		// ignored because fb.js will be transformed and copied by babel-loader
		ignore: __dirname + "/extension/src/src_chrome/fb.js" 
	}
],
{});

module.exports = {
	entry: {
		"panel": "./extension/src/panel.js",
		"fb": "./extension/src/src_chrome/fb.js"
	},
	output: {
		path: __dirname + "/extension/dist_chrome",
		filename: "[name].js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	},
	plugins : [HtmlWebpackPluginConfig, CopyWebpackPluginConfig],
	devServer : {
		contentBase: "./extension/dist_chrome/",
		hot: true
	}
};
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + "/src/ui/panel.html",
	filename: "panel.html",
	inject: "body",
	excludeChunks: ["fb", "tw"]
});

var CopyWebpackPluginConfig = new CopyWebpackPlugin([
	{
		from: __dirname + "/src/extension/src_chrome",
		to: __dirname + "/dist_chrome",
		// ignored because fb.js & tw.js will be transformed and copied by babel-loader
		ignore: [__dirname + "/src/extension/src_chrome/fb.js", __dirname + "/src/extension/src_chrome/tw.js"]
	},
	{
		from: __dirname + "/src/extension/img",
		to: __dirname + "/dist_chrome/img/"
	},
	{
		from: __dirname + "/node_modules/@blueprintjs/core/dist/blueprint.css",
		to: __dirname + "/dist_chrome/"
	}
],
{});

module.exports = {
	entry: {
		"panel": "./src/ui/panel.js",
		"fb": "./src/extension/src_chrome/fb.js",
		"tw": "./src/extension/src_chrome/tw.js"
	},
	output: {
		path: __dirname + "/dist_chrome",
		filename: "[name].js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	},
	plugins : [HtmlWebpackPluginConfig, CopyWebpackPluginConfig],
	devServer : {
		outputPath: __dirname + "./dist_chrome",
		contentBase: "./dist_chrome/",
		hot: true
	}
};
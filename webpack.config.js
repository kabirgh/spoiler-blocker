var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(__dirname, "/src/ui/panel.html"),
	filename: "panel.html",
	inject: "body",
	excludeChunks: ["fb", "tw"]
});

var CopyWebpackPluginConfig = new CopyWebpackPlugin([
	// Copy src_chrome files except fb.js and tw.js
	{
		from: path.join(__dirname, "/src/extension/src_chrome"),
		to: path.join(__dirname, "/dist"),
		// ignored because fb.js & tw.js will be transformed and copied by babel-loader
		ignore: [
			path.join(__dirname, "/src/extension/src_chrome/fb.js"), 
			path.join(__dirname, "/src/extension/src_chrome/tw.js")
		]
	},
	// Copy icons
	{
		from: path.join(__dirname, "/src/extension/img"),
		to: path.join(__dirname, "/dist/img/")
	},
	// Copy blueprintjs stylesheet
	{
		from: path.join(__dirname, "/node_modules/@blueprintjs/core/dist/blueprint.css"),
		to: path.join(__dirname, "/dist/")
	},
	// Copy blueprintjs icons
	{
		from: path.join(__dirname, "/node_modules/@blueprintjs/core/resources"),
		to: path.join(__dirname, "/dist/resources/")
	}
],
{});

var UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
	compress: {
		drop_console: true
	}
});

var devPluginConfigArr = [HtmlWebpackPluginConfig, CopyWebpackPluginConfig];
var prodPluginConfigArr = [HtmlWebpackPluginConfig, CopyWebpackPluginConfig, UglifyJsPluginConfig];

module.exports = {
	entry: {
		"panel": "./src/ui/panel.js",
		"fb": "./src/extension/src_chrome/fb.js",
		"tw": "./src/extension/src_chrome/tw.js"
	},
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "[name].js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	},
	plugins: process.env.NODE_ENV === "production" ? prodPluginConfigArr : devPluginConfigArr,
	devServer: {
		outputPath: path.join(__dirname, "./dist"),
		contentBase: "./dist/",
		hot: true
	}
};
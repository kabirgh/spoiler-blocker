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
		to: path.join(__dirname, "/dist_chrome"),
		// ignored because fb.js & tw.js will be transformed and copied by babel-loader
		ignore: [
			path.join(__dirname, "/src/extension/src_chrome/fb.js"), 
			path.join(__dirname, "/src/extension/src_chrome/tw.js")
		]
	},
	// Copy icons
	{
		from: path.join(__dirname, "/src/extension/img"),
		to: path.join(__dirname, "/dist_chrome/img/")
	},
	// Copy blueprintjs stylesheet
	{
		from: path.join(__dirname, "/node_modules/@blueprintjs/core/dist/blueprint.css"),
		to: path.join(__dirname, "/dist_chrome/")
	},
	// Copy blueprintjs icons
	{
		from: path.join(__dirname, "/node_modules/@blueprintjs/core/resources"),
		to: path.join(__dirname, "/dist_chrome/resources/")
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
		path: path.join(__dirname, "/dist_chrome"),
		filename: "[name].js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	},
	plugins : [
		HtmlWebpackPluginConfig, 
		CopyWebpackPluginConfig
	],
	devServer : {
		outputPath: path.join(__dirname, "./dist_chrome"),
		contentBase: "./dist_chrome/",
		hot: true
	}
};
var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var PanelHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(__dirname, "/src/panel/panel.html"),
	filename: "panel.html",
	inject: "body",
	excludeChunks: ["options", "fb", "tw"]
});

var OptionHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(__dirname, "/src/options/options.html"),
	filename: "options.html",
	inject: "body",
	excludeChunks: ["panel", "fb", "tw"]
});

var CopyWebpackPluginConfig = new CopyWebpackPlugin([
	// Copy manifest
	{
		from: path.join(__dirname, "/src/manifest.json"),
		to: path.join(__dirname, "/dist"),
	},
	// Copy background page
	{
		from: path.join(__dirname, "/src/bg.html"),
		to: path.join(__dirname, "/dist"),
	},
	// Copy icons
	{
		from: path.join(__dirname, "/src/img"),
		to: path.join(__dirname, "/dist/img/")
	},
	// Copy blueprintjs stylesheet
	{
		from: path.join(__dirname, "/node_modules/@blueprintjs/core/dist/blueprint.css"),
		to: path.join(__dirname, "/dist/style/")
	},
	// Copy blueprintjs icons
	{
		from: path.join(__dirname, "/node_modules/@blueprintjs/core/resources"),
		to: path.join(__dirname, "/dist/style/resources/")
	}
],
{});

// Remove console.* statements
var UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
	compress: {
		drop_console: true
	}
});

var DefinePluginConfig = new webpack.DefinePlugin({
	"process.env": {
		"NODE_ENV": JSON.stringify("production")
	}
});


module.exports = {
	entry: {
		"panel": "./src/panel/panel.js",
		"fb": "./src/logic/fb.js",
		"tw": "./src/logic/tw.js"
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
	plugins: [
		PanelHtmlWebpackPluginConfig,
		OptionHtmlWebpackPluginConfig,
		CopyWebpackPluginConfig, 
		UglifyJsPluginConfig,
		DefinePluginConfig
	]
};
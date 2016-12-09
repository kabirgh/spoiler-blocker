var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(__dirname, "/src/panel/panel.html"),
	filename: "panel.html",
	inject: "body"
});

var CopyWebpackPluginConfig = new CopyWebpackPlugin([
	// Copy blueprintjs stylesheet
	{
		from: path.join(__dirname, "/node_modules/@blueprintjs/core/dist/blueprint.css"),
		to: path.join(__dirname, "/devserver/style/")
	},
	// Copy blueprintjs icons
	{
		from: path.join(__dirname, "/node_modules/@blueprintjs/core/resources"),
		to: path.join(__dirname, "/devserver/resources/")
	}
],
{});

var DefinePluginConfig = new webpack.DefinePlugin({
	"process.env": {
		"NODE_ENV": JSON.stringify("devServer")
	}
});


module.exports = {
	entry: {
		"panel": "./src/panel/panel.js"
	},
	output: {
		path: path.join(__dirname, "/devserver"),
		filename: "[name].js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	},
	plugins: [
		HtmlWebpackPluginConfig, 
		CopyWebpackPluginConfig,
		DefinePluginConfig
	],
	// TODO: find output folder location
	devServer: {
		outputPath: path.join(__dirname, "./devserver"),
		contentBase: "./devserver/",
		hot: true
	}
};
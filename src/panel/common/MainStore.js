/* global chrome */
import {observable, computed, autorun, toJS} from "mobx";
import parser from "./internal/parser";

class Store {
	@observable tokenArr = [];

	@observable spoilers = [];
	@observable isAddCardVisible = false; // TODO: move into another store?
	@observable isDownloadCardVisible = false;

	constructor() {	}

	@computed get lowerCaseTitles() {
		return this.spoilers.map(obj => obj["title"].toLowerCase());
	}

	@computed get tokenArr() {
		let obj;
		for (let i=0; i<this.spoilers.length; i++) {
			obj = this.spoilers[i];
			
			obj["tags"] = parser.buildExpressionArray(obj["tags"]);
		}
	}
}

const MainStore = new Store();

// NODE_ENV is set in webpack config file. Only reference chrome namespace if build is not webpack-dev-server
if (process.env.NODE_ENV !== "devServer") {
	chrome.storage.local.get("spoilersArr", function(obj) {
		if (obj["spoilersArr"] === undefined) {
			MainStore.spoilers = [];
		}
		else {
			MainStore.spoilers = obj["spoilersArr"];

			console.log(JSON.stringify(obj["spoilersArr"]));
		}
	});

	autorun(() => {
		// Accesses all properties recursively, triggering autorun when any change is made
		JSON.stringify(MainStore.spoilers);
		chrome.storage.local.set({"spoilersArr": toJS(MainStore.spoilers)});
	});
}
// Populate dummy data
else {
	MainStore.spoilers = [
		{
			"hidePref":"overlay",
			"isActive":true,
			"isCaseSensitive":false,
			"tags":"a, b, c",
			"title":"all"
		},
		{
			"hidePref":"remove",
			"isActive":false,
			"isCaseSensitive":false,
			"tags":"spoiler alert, unilad, gibberish ksjbdg; kjagbel",
			"title":"list the second"
		}
	];
}

export default MainStore;

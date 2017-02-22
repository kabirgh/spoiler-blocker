/* global chrome */
import {observable, computed, autorun, toJS} from "mobx";

class Store {
	@observable spoilers = [];
	@observable isAddCardVisible = false; // TODO: move into another store?
	@observable isDownloadCardVisible = false;

	constructor() {	}

	@computed get lowerCaseTitles() {
		return this.spoilers.map(obj => obj["title"].toLowerCase());
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
			"tokenArr": [{"tokenType":"LITERAL","value":"a","precedence":9},{"tokenType":"LITERAL","value":"b","precedence":9},{"tokenType":"LITERAL","value":"c","precedence":9},{"tokenType":"BINARY_OP","value":"OR","precedence":2}],
			"title":"all"
		},
		{
			"hidePref":"remove",
			"isActive":false,
			"isCaseSensitive":false,
			"tags":"(spoiler alert, unilad), gibberish & ksjbdg",
			"tokenArr": [{"tokenType":"LITERAL","value":"spoiler alert","precedence":9},{"tokenType":"LITERAL","value":"unilad","precedence":9},{"tokenType":"BINARY_OP","value":"OR","precedence":2},{"tokenType":"LITERAL","value":"gibberish","precedence":9},{"tokenType":"LITERAL","value":"ksjbdg","precedence":9},{"tokenType":"BINARY_OP","value":"AND","precedence":1},{"tokenType":"BINARY_OP","value":"OR","precedence":2}],
			"title":"list the second"
		}
	];
}

export default MainStore;

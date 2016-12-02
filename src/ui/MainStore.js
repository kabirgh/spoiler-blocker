/* global chrome */
import {observable, computed, autorun, toJS} from "mobx";

class Store {
	@observable spoilers = [];
	@observable isAddCardVisible = false;
	@observable defaultHidePref = "overlay"; // or remove
	@observable defaultCaseSensitivity = false; // TODO: provide global option to change this

	constructor() {	}

	@computed get lowerCaseTitles() {
		return this.spoilers.map(obj => obj["title"].toLowerCase());
	}
}

const MainStore = new Store();

chrome.storage.local.get("spoilersArr", function(obj) {
	if (obj["spoilersArr"] === undefined) {
		MainStore.spoilers = [];
	}
	else {
		MainStore.spoilers = obj["spoilersArr"];
	}
});

autorun(() => {
	// Accesses all properties recursively, triggering autorun when any change is made
	JSON.stringify(MainStore.spoilers);
	chrome.storage.local.set({"spoilersArr": toJS(MainStore.spoilers)});
});

export default MainStore;
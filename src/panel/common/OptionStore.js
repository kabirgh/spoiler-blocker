/* global chrome */
import {observable, autorun, toJS} from "mobx";

class Store {
	@observable defaultHidePref = "overlay"; // or remove
	@observable defaultCaseSensitivity = false;

	constructor() {	}
}

const OptionStore = new Store();

chrome.storage.local.get("prefs", function(obj) {
	if (obj["prefs"] === undefined) {
		OptionStore.spoilers = [];
	}
	else {
		OptionStore.spoilers = obj["prefs"];
	}
});

autorun(() => {
	// Accesses all properties recursively, triggering autorun when any change is made
	JSON.stringify(OptionStore.spoilers);
	chrome.storage.local.set({"prefs": toJS(OptionStore.spoilers)});
});

export default OptionStore;
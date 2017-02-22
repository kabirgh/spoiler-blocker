/* global chrome */
import {observable, autorun, toJS} from "mobx";

class Store {
	@observable prefs = {};

	constructor() {	}
}

const OptionStore = new Store();

if (process.env.NODE_ENV !== "devServer") {
	chrome.storage.local.get("prefs", function(obj) {
		console.log("prefs get: " + JSON.stringify(obj["prefs"]));

		if (obj["prefs"] === undefined || obj["prefs"] === {}) {
			console.log("if block");
			OptionStore.prefs = {
				defaultHidePref: "overlay", // or remove
				defaultCaseSensitivity: false,
				showMoreNum: 1
			};
		}
		else {
			OptionStore.prefs = obj["prefs"];
		}
	});
	

	autorun(() => {
		// Accesses all properties recursively, triggering autorun when any change is made
		JSON.stringify(OptionStore.prefs);
		console.log("autorun optionstore set prefs: " + JSON.stringify(OptionStore.prefs));
		chrome.storage.local.set({"prefs": toJS(OptionStore.prefs)});
	});
}

export default OptionStore;
import {observable, computed} from "mobx";

let defaultSpoilers = [
	{
		"title": "spoiler-tag1-tag2",
		"isActive": true,
		"isCaseSensitive": true,
		"hidePref": "overlay",
		"tags": ["tag1", "tag2"]
	},
	{
		"title": "all-posts",
		"isActive": true,
		"isCaseSensitive": false,
		"hidePref": "overlay",
		"tags": ["a", "b", "c"]
	}
];

class Store {
	@observable spoilers;
	@observable addListAction = false;
	@observable duplicateTitle = false;
	// TODO: set options to change default prefs
	defaultHidePref = "overlay"; // or remove
	defaultCaseSensitivity = false;

	constructor(spoilers=defaultSpoilers) {
		this.spoilers = spoilers;
	}

	@computed get titles() {
		return this.spoilers.map(obj => obj["title"]);
	}
}

const store = new Store();

export default store;
export { Store };
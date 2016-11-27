import {observable, computed, autorun} from "mobx";

let defaultSpoilers = [
	{
		"title": "spoiler-tag1-tag2",
		"isActive": true,
		"isCaseSensitive": false,
		"hidePref": "overlay",
		"tags": ["tag1", "tag2"]
	},
	{
		"title": "all-posts",
		"isActive": false,
		"isCaseSensitive": true,
		"hidePref": "overlay",
		"tags": ["a", "b", "c"]
	}
];

// TODO: get spoilers from chrome storage

class Store {
	@observable spoilers;
	@observable isAddCardVisible = false;
	@observable defaultHidePref = "overlay"; // or remove
	@observable defaultCaseSensitivity = false;

	constructor(spoilers=defaultSpoilers) {
		this.spoilers = spoilers;
	}

	@computed get lowerCaseTitles() {
		return this.spoilers.map(obj => obj["title"].toLowerCase());
	}
}

const MainStore = new Store();

autorun(() => {
	console.log("autorun, new spoilers arr on next line");
	console.log(MainStore.spoilers);
});

export default MainStore;
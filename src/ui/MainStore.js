import {observable, computed} from "mobx";

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

export default MainStore;
export { Store };
import {observable} from "mobx";

class Store {
	@observable defaultHidePref = "overlay"; // or remove
	@observable defaultCaseSensitivity = false; // TODO: create options page to change this

	constructor() {	}
}

const OptionStore = new Store();

export default OptionStore;
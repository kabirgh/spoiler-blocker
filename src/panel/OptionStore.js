import {observable} from "mobx";

class Store {
	@observable defaultHidePref = "overlay"; // or remove
	@observable defaultCaseSensitivity = false;

	constructor() {	}
}

const OptionStore = new Store();

export default OptionStore;
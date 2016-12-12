import {action} from "mobx";
import OptionStore from "../panel/common/OptionStore";

module.exports = {
	toggleCaseSensitivity: action(toggleCaseSensitivity),
	toggleHidePref: action(toggleHidePref),
};

function toggleCaseSensitivity() {
	OptionStore.defaultCaseSensitivity = !OptionStore.defaultCaseSensitivity;
}

function toggleHidePref() {
	if (OptionStore.defaultHidePref === "overlay") {
		OptionStore.defaultHidePref = "remove";
	}
	else if (OptionStore.defaultHidePref === "remove") {
		OptionStore.defaultHidePref = "overlay";
	}
	else {
		console.log("Error in loading hidePref. Defaulting to overlay");
		OptionStore.defaultHidePref = "overlay";
	}
}
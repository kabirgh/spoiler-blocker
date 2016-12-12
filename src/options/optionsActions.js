import {action} from "mobx";
import OptionStore from "../panel/common/OptionStore";

module.exports = {
	toggleCaseSensitivity: action(toggleCaseSensitivity),
	toggleHidePref: action(toggleHidePref),
};

function toggleCaseSensitivity() {
	OptionStore.prefs.defaultCaseSensitivity = !OptionStore.prefs.defaultCaseSensitivity;
}

function toggleHidePref() {
	if (OptionStore.prefs.defaultHidePref === "overlay") {
		OptionStore.prefs.defaultHidePref = "remove";
	}
	else if (OptionStore.prefs.defaultHidePref === "remove") {
		OptionStore.prefs.defaultHidePref = "overlay";
	}
	else {
		console.log("Error in loading hidePref. Defaulting to overlay");
		OptionStore.prefs.defaultHidePref = "overlay";
	}
}
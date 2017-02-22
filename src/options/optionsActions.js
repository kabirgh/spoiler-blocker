import {action} from "mobx";
import OptionStore from "../panel/common/OptionStore";
import commonActions from "../panel/common/commonActions";

module.exports = {
	toggleCaseSensitivity: action(toggleCaseSensitivity),
	toggleHidePref: action(toggleHidePref),
	changeSeeMoreNum: action(changeSeeMoreNum)
};

function toggleCaseSensitivity() {
	OptionStore.prefs["defaultCaseSensitivity"] = !OptionStore.prefs["defaultCaseSensitivity"];
}

function toggleHidePref() {
	if (OptionStore.prefs["defaultHidePref"] === "overlay") {
		OptionStore.prefs["defaultHidePref"] = "remove";
	}
	else if (OptionStore.prefs["defaultHidePref"] === "remove") {
		OptionStore.prefs["defaultHidePref"] = "overlay";
	}
	else {
		console.log("Error in loading hidePref. Defaulting to overlay");
		OptionStore.prefs["defaultHidePref"] = "overlay";
	}
}

function changeSeeMoreNum(value) {
	if (!commonActions.isInteger(value) || value < 1) {
		return;
	}

	OptionStore.prefs["seeMoreNum"] = value;
}
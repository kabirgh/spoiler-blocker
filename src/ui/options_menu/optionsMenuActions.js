import {action} from "mobx";
import MainStore from "../MainStore";

module.exports = {
	toggleActive: action(toggleActive),
	toggleCaseSensitive: action(toggleCaseSensitive),
	toggleHidePref: action(toggleHidePref),
	deleteList: action(deleteList)
};

function toggleActive(index) {
	MainStore.spoilers[index]["isActive"] = !MainStore.spoilers[index]["isActive"];
}

function toggleCaseSensitive(index) {
	MainStore.spoilers[index]["isCaseSensitive"] = !MainStore.spoilers[index]["isCaseSensitive"];
}

function toggleHidePref(index) {
	if (MainStore.spoilers[index]["hidePref"] === "overlay") {
		MainStore.spoilers[index]["hidePref"] = "remove";
	}
	else if (MainStore.spoilers[index]["hidePref"] === "remove") {
		MainStore.spoilers[index]["hidePref"] = "overlay";
	}
	else {
		console.log("Error in loading hidePref. Defaulting to overlay");
		MainStore.spoilers[index]["hidePref"] = "overlay";
	}
}

function deleteList(index) {
	MainStore.spoilers.splice(index, 1);
}
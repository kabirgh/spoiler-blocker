import {action} from "mobx";
import store from "../store";

module.exports = {
	toggleActive: action(toggleActive),
	toggleCaseSensitive: action(toggleCaseSensitive),
	toggleHidePref: action(toggleHidePref),
	deleteList: action(deleteList)
};

function toggleActive(index) {
	store.spoilers[index]["isActive"] = !store.spoilers[index]["isActive"];
}

function toggleCaseSensitive(index) {
	store.spoilers[index]["isCaseSensitive"] = !store.spoilers[index]["isCaseSensitive"];
}

function toggleHidePref(index) {
	if (store.spoilers[index]["hidePref"] === "overlay") {
		store.spoilers[index]["hidePref"] = "remove";
	}
	else if (store.spoilers[index]["hidePref"] === "remove") {
		store.spoilers[index]["hidePref"] = "overlay";
	}
	else {
		console.log("Error in loading hidePref. Defaulting to overlay");
		store.spoilers[index]["hidePref"] = "overlay";
	}
}

function deleteList(index) {
	store.spoilers.splice(index, 1);
}
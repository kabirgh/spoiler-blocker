import {action} from "mobx";
import MainStore from "../common/MainStore";
import ToastStore from "../toast/ToastStore";
import commonActions from "../common/commonActions";

// TODO: ES2015
module.exports = {
	isValidTitle: action(isValidTitle),
	editTitle: action(editTitle),
	editTags: action(editTags)
};

function isValidTitle(title, index) {
	if (commonActions.isInvalidTitle(title) || commonActions.isDuplicateTitleSkipIndex(title, index)) {
		return false;
	} else {
		return true;
	}
}

function editTitle(index, title, tags) {
	console.log("editTitle called");

	MainStore.spoilers[index]["title"] = title;
	MainStore.spoilers[index]["tags"] = commonActions.tagStringToArray(tags);

	console.log("new title on next line");
	console.log(title);

	console.log("spoiler tags for 1st list on next line");
	console.log(MainStore.spoilers[0]["tags"]);
}

// TODO: disallow duplicate tags?
function editTags(index, title, tags) {
	console.log("editTags called");

	MainStore.spoilers[index]["title"] = title;
	MainStore.spoilers[index]["tags"] = commonActions.tagStringToArray(tags);

	console.log("spoiler tags for 1st list on next line");
	console.log(MainStore.spoilers[0]["tags"]);
}
import {action} from "mobx";
import MainStore from "../MainStore";
import ToastStore from "../toast/ToastStore";
import addActions from "../add_card/addActions";

// TODO: ES2015
module.exports = {
	isValidTitle: action(isValidTitle),
	editTitle: action(editTitle),
	editTags: action(editTags)
};

function isValidTitle(title) {
	if (addActions.isInvalidTitle(title)) {
		ToastStore.isInvalidTitleOrTags = true;
		return false;
	}
	else if (addActions.isDuplicateTitle(title)) {
		ToastStore.isDuplicateTitle = true;
		return false;
	} else {
		return true;
	}
}

function editTitle(index, title, tags) {
	console.log("editTitle called");

	MainStore.spoilers[index]["title"] = title;
	MainStore.spoilers[index]["tags"] = addActions.tagStringToArray(tags);

	console.log("new title on next line");
	console.log(title);

	console.log("spoiler tags for 1st list on next line");
	console.log(MainStore.spoilers[0]["tags"]);
}

// TODO: disallow duplicate tags?
function editTags(index, title, tags) {
	console.log("editTags called");

	MainStore.spoilers[index]["title"] = title;
	MainStore.spoilers[index]["tags"] = addActions.tagStringToArray(tags);

	console.log("spoiler tags for 1st list on next line");
	console.log(MainStore.spoilers[0]["tags"]);
}

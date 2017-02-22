import {action} from "mobx";
import commonActions from "../common/commonActions";

// TODO: ES2015
module.exports = {
	isValidTitle: action(isValidTitle),
	editTitle: action(editTitle),
	editTags: action(editTags)
};

function isValidTitle(index, title) {
	if (commonActions.isInvalidTitle(title) || commonActions.isDuplicateTitleSkipIndex(title, index)) {
		return false;
	}
	
	return true;
}

function editTitle(index, title, tagString) {
	console.log("editTitle called");
	commonActions.editList(index, title, tagString);
}

// TODO: disallow duplicate tags?
function editTags(index, title, tagString) {
	console.log("editTags called");
	commonActions.editList(index, title, tagString);
}

import {action} from "mobx";
import MainStore from "./MainStore";
import ToastStore from "../toast/ToastStore";

module.exports = {
	tagStringToArray: action(tagStringToArray),
	isDuplicateTitle: action(isDuplicateTitle),
	isDuplicateTitleSkipIndex: action(isDuplicateTitleSkipIndex),
	isInvalidTitle: action(isInvalidTitle),
	isInvalidTags: action(isInvalidTags)
};

function tagStringToArray(tagString) {
	const tagArr = tagString.split(",");
	return tagArr.map(tag => tag.trim());
}

function isDuplicateTitle(title) {
  return isDuplicateTitleSkipIndex(-1, title);
}

function isDuplicateTitleSkipIndex(index, title) {
	const lowerCaseTitle = title.toLowerCase();

	for (let i=0; i<MainStore.lowerCaseTitles.length; i++) {
		if (i != index && lowerCaseTitle === MainStore.lowerCaseTitles[i]) {
      indicateDuplicateTitle();
			return true;
		}
	}

	return false;
}

function isInvalidTitle(title) {
	if (title.trim() === "") {
		console.log("invalid title");
    indicateInvalidTitleOrTags();
		return true;
	} else {
		return false;
	}
}

function isInvalidTags(tagArr) {
	for (let i=0; i<tagArr.length; i++) {
		if (tagArr[i] === "") {
			console.log("invalid tag");
      indicateInvalidTitleOrTags();
			return true;
		}
	}

	return false;
}

function indicateInvalidTitleOrTags() {
  ToastStore.isInvalidTitleOrTags = true;
}

function indicateDuplicateTitle() {
  ToastStore.isDuplicateTitle = true;
}

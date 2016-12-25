import {action} from "mobx";
import MainStore from "./MainStore";
import ToastStore from "../toast/ToastStore";
import OptionStore from "./OptionStore";

module.exports = {
	addNewList: action(addNewList),
	tagStringToArray: action(tagStringToArray),
	isDuplicateTitle: action(isDuplicateTitle),
	isDuplicateTitleSkipIndex: action(isDuplicateTitleSkipIndex),
	isInvalidTitle: action(isInvalidTitle),
	isInvalidTags: action(isInvalidTags),
	isInvalidId: action(isInvalidId)
};

function addNewList(title, tagArr) {
	title = title.trim();

	if (isInvalidTitle(title) || isInvalidTags(tagArr) || isDuplicateTitle(title)) {
		return;
	}

	MainStore.spoilers.push({
		title: title,
		isActive: true,
		isCaseSensitive: OptionStore.prefs.defaultCaseSensitivity,
		hidePref: OptionStore.prefs.defaultHidePref,
		tags: tagArr
	});

	ToastStore.isAddSuccess = true;
}

function tagStringToArray(tagString) {
	tagString = tagString.trim();
	const tagArr = tagString.split(",");
	return tagArr.map(tag => tag.trim());
}

function isDuplicateTitle(title) {
	return isDuplicateTitleSkipIndex(title, -1);
}

function isDuplicateTitleSkipIndex(title, index) {
	const lowerCaseTitle = title.trim().toLowerCase();

	for (let i=0; i<MainStore.lowerCaseTitles.length; i++) {
		if (i !== index && lowerCaseTitle === MainStore.lowerCaseTitles[i]) {
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

function isInvalidId(id) {
	// Checks whether id is a number and an integer
	if (Number.isInteger(parseFloat(id))) {
		return false;
	} else {
		indicateInvalidId();
		return true;
	}
}

function indicateInvalidTitleOrTags() {
	ToastStore.isInvalidTitleOrTags = true;
}

function indicateDuplicateTitle() {
	ToastStore.isDuplicateTitle = true;
}

function indicateInvalidId() {
	ToastStore.isInvalidId = true;
}

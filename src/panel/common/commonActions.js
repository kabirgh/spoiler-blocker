import {action} from "mobx";
import MainStore from "./MainStore";
import ToastStore from "../toast/ToastStore";
import OptionStore from "./OptionStore";

module.exports = {
	addNewList: action(addNewList),
	editList: action(editList),
	isDuplicateTitle: action(isDuplicateTitle),
	isDuplicateTitleSkipIndex: action(isDuplicateTitleSkipIndex),
	isInvalidTitle: action(isInvalidTitle),
	isInvalidTags: action(isInvalidTags),
	isInvalidId: action(isInvalidId),
	resetToastObject: action(resetToastObject)
};

function addNewList(title, tagString) {
	title = title.trim();

	if (isInvalidTitle(title) || isInvalidTags(tagString) || isDuplicateTitle(title)) {
		return;
	}

	MainStore.spoilers.push({
		title: title,
		isActive: true,
		isCaseSensitive: OptionStore.prefs.defaultCaseSensitivity,
		hidePref: OptionStore.prefs.defaultHidePref,
		tags: tagString
	});

	ToastStore.isAddSuccess = true;
}

function editList(index, title, tagString) {
	MainStore.spoilers[index]["title"] = title.trim();
	MainStore.spoilers[index]["tags"] = tagStringToArray(tagString);
}

function isDuplicateTitle(title) {
	return isDuplicateTitleSkipIndex(title, -1);
}

function isDuplicateTitleSkipIndex(title, index) {
	console.log(title);
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

function tagStringToArray(tagString) {
	tagString = tagString.trim();
	const tagArr = tagString.split(",");
	return tagArr.map(tag => tag.trim());
}

function isInvalidTags(tagString) {
	const tagArr = tagStringToArray(tagString);

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


function resetToastObject() {
	ToastStore.isAddSuccess = false;
	ToastStore.isInvalidTitleOrTags = false;
	ToastStore.isDuplicateTitle = false;
	ToastStore.isInvalidId = false;
	ToastStore.isMissingList = false;
	ToastStore.isListDeleted = false;
}

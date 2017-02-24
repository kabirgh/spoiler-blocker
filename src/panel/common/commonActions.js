import {action} from "mobx";
import MainStore from "./MainStore";
import ToastStore from "../toast/ToastStore";
import OptionStore from "./OptionStore";
import parser from "./internal/parser";


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
	const trimmedTitle = title.trim();
	if (isInvalidTitle(trimmedTitle) || isDuplicateTitle(trimmedTitle) || isInvalidTags(tagString)) {
		return;
	}

	// TODO: reuse token array created in isInvalidTags?
	const tokenArr = parser.buildExpressionArray(tagString);

	MainStore.spoilers.push({
		title: trimmedTitle,
		isActive: true,
		isCaseSensitive: OptionStore.prefs.defaultCaseSensitivity,
		hidePref: OptionStore.prefs.defaultHidePref,
		tags: tagString,
		tokenArr: tokenArr
	});

	ToastStore.isAddSuccess = true;
}

function editList(index, title, tagString) {
	// TODO: extract repeated code from addNewList?
	const trimmedTitle = title.trim();
	if (isInvalidTitle(trimmedTitle) || isDuplicateTitle(trimmedTitle) || isInvalidTags(tagString)) {
		return;
	}

	MainStore.spoilers[index]["title"] = trimmedTitle;
	MainStore.spoilers[index]["tags"] = tagString;
	MainStore.spoilers[index]["tokenArr"] = parser.buildExpressionArray(tagString);
}

function isDuplicateTitle(title) {
	return isDuplicateTitleSkipIndex(title, -1);
}

// TODO: make side-effect free. Currently updates ToastStore
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

// TODO: make side-effect free. Currently updates ToastStore
function isInvalidTitle(title) {
	if (title.trim() === "") {
		console.log("Invalid title");
		indicateInvalidTitleOrTags();
		return true;
	} 
	else {
		return false;
	}
}

// TODO: make side-effect free. Currently updates ToastStore
function isInvalidTags(tagString) {
	try {
		parser.buildExpressionArray(tagString);
		return false;
	}
	catch (err) {
		console.log("Tag parse error: " + err.message);
		indicateParseError(err.message);
		return true;
	}
}

// TODO: make side-effect free. Currently updates ToastStore
function isInvalidId(id) {
	// Checks whether id is a number and an integer
	if (Number.isInteger(parseFloat(id))) {
		return false;
	} 
	else {
		indicateInvalidId();
		return true;
	}
}

function indicateParseError(message) {
	ToastStore.tagParseMessage = message;
	ToastStore.isTagParseError = true;
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
	ToastStore.isTagParseError = false;
	ToastStore.tagParseMessage = "";
}

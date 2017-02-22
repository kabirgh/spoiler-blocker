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
	title = title.trim();
	const tokenArr = parser.buildExpressionArray(tagString);

	if (isInvalidTitle(title) || isInvalidTags(tokenArr) || isDuplicateTitle(title)) {
		return;
	}

	MainStore.spoilers.push({
		title: title,
		isActive: true,
		isCaseSensitive: OptionStore.prefs.defaultCaseSensitivity,
		hidePref: OptionStore.prefs.defaultHidePref,
		tags: tagString,
		tokenArr: tokenArr
	});

	ToastStore.isAddSuccess = true;
}

function editList(index, title, tagString) {
	MainStore.spoilers[index]["title"] = title.trim();
	MainStore.spoilers[index]["tags"] = tagString;
	MainStore.spoilers[index]["tokenArr"] = parser.buildExpressionArray(tagString);
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


function isInvalidTags(tokenArr) {
	for (let i=1; i<tokenArr.length; i++) {
		// Tags are invalid if there are two consecutive operators
		if (tokenArr[i-1]["tokenType"] === "BINARY_OP" && tokenArr[i]["tokenType"] === "BINARY_OP") {
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

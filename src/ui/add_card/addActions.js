import {action} from "mobx";
import MainStore from "../MainStore";
import ToastStore from "../toast/ToastStore";

// TODO: ES2015
module.exports = {
	saveAddList: action(saveAddList),
	hideAddCard: action(hideAddCard),
	resetToastFlags: action(resetToastFlags),
	tagStringToArray: tagStringToArray,
	isDuplicateTitle: isDuplicateTitle,
	isInvalidTitle: isInvalidTitle,
	isInvalidTags: isInvalidTags
};

function saveAddList(title, tagString) {
	title = title.trim();
	const tagArr = tagStringToArray(tagString);

	if (isInvalidTitle(title) || isInvalidTags(tagArr)) {
		ToastStore.isInvalidTitleOrTags = true;
	}
	else if (isDuplicateTitle(title)) {
		ToastStore.isDuplicateTitle = true;
	}
	else {
		MainStore.spoilers.push({
			title: title,
			isActive: true,
			isCaseSensitive: MainStore.defaultCaseSensitivity,
			hidePref: MainStore.defaultHidePref,
			tags: tagArr
		});

		ToastStore.isAddSuccess = true;

		hideAddCard();
	}
}

function isDuplicateTitle(title) {
	const lowerCaseTitle = title.toLowerCase();

	for (let i=0; i<MainStore.lowerCaseTitles.length; i++) {
		if (lowerCaseTitle === MainStore.lowerCaseTitles[i]) {
			return true;
		}
	}

	return false;
}

function isInvalidTitle(title) {
	if (title.trim() === "") {
		console.log("invalid title");
		return true;
	} else {
		return false;
	}
}

function isInvalidTags(tagArr) {
	for (let i=0; i<tagArr.length; i++) {
		if (tagArr[i] === "") {
			console.log("invalid tag");
			return true;
		}
	}

	return false;
}

function tagStringToArray(tagString) {
	const tagArr = tagString.split(",");
	return tagArr.map(tag => tag.trim());
}

function hideAddCard() {
	MainStore.isAddCardVisible = false;
}

function resetToastFlags() {
	ToastStore.isInvalidTitleOrTags = false;
	ToastStore.isDuplicateTitle = false;
	ToastStore.isAddSuccess = false;
}

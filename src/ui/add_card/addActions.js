import {action} from "mobx";
import MainStore from "../MainStore";
import ToastStore from "../ToastStore";

// TODO: ES2015
module.exports = {
	saveAddList: action(saveAddList),
	hideAddCard: action(hideAddCard),
	resetToastFlags: action(resetToastFlags)
};

function saveAddList(title, tagString) {
	title = title.trim();

	if (isInvalidTitleOrTags(title, tagString)) {
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
			tags: tagStringToArray(tagString)
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

function isInvalidTitleOrTags(title, tagString) {
	if (title.trim() === "" || tagString.trim() === "") {
		console.log("invalid title/tags");
		return true;
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
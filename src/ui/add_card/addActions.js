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

	ToastStore.shouldRenderToast = true;
}

function isDuplicateTitle(title) {
	for (let i=0; i<MainStore.titles.length; i++) {
		if (title.trim() === MainStore.titles[i].trim()) {
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
import {action} from "mobx";
import MainStore from "../common/MainStore";
import OptionStore from "../common/OptionStore";
import ToastStore from "../toast/ToastStore";
import commonActions from "../common/commonActions";

// TODO: ES2015
module.exports = {
	saveAddList: action(saveAddList),
	hideAddCard: action(hideAddCard),
	resetToastFlags: action(resetToastFlags)
};

function saveAddList(title, tagString) {
	title = title.trim();
	const tagArr = commonActions.tagStringToArray(tagString);

	if (commonActions.isInvalidTitle(title) ||
		commonActions.isInvalidTags(tagArr) ||
		commonActions.isDuplicateTitle(title)) {
		
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

	hideAddCard();
}

function hideAddCard() {
	MainStore.isAddCardVisible = false;
}

function resetToastFlags() {
	ToastStore.isInvalidTitleOrTags = false;
	ToastStore.isDuplicateTitle = false;
	ToastStore.isAddSuccess = false;
}

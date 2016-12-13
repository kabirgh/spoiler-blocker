import {action} from "mobx";
import MainStore from "../common/MainStore";
import OptionStore from "../common/OptionStore";
import ToastStore from "../toast/ToastStore";
import commonActions from "../common/commonActions";
import "whatwg-fetch";

// TODO: ES2015
module.exports = {
	saveDownloadList: action(saveDownloadList),
	hideDownloadCard: action(hideDownloadCard),
	resetToastFlags: action(resetToastFlags)
};

function saveDownloadList(title, id) {
	fetch("https://salty-earth-11606.herokuapp.com/downloadList?id=" + id, {
		method: "get",
  	credentials: "include"
	}).then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log(data);
	});

	saveList(title, tags);
}

function saveList(title, tags) {
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

	hideDownloadCard();
}

function hideDownloadCard() {
	MainStore.isDownloadCardVisible = false;
}

function resetToastFlags() {
	ToastStore.isInvalidTitleOrTags = false;
	ToastStore.isDuplicateTitle = false;
	ToastStore.isDownloadSuccess = false;
}

/* global chrome */
import {action} from "mobx";
import MainStore from "../common/MainStore";

module.exports = {
	showAddCard: action(showAddCard),
	openOptionsPage: action(openOptionsPage),
	showDownloadCard: action(showDownloadCard)
};

function showAddCard() {
	MainStore.isAddCardVisible = true;
}

function openOptionsPage() {
	// TODO: show option page in webpack-dev-server too
	if (process.env.NODE_ENV !== "devServer") {
		// Chrome 42+
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		}
		else {
			window.open(chrome.runtime.getURL("options.html"));
		}
	}
}

function showDownloadCard() {
	MainStore.isDownloadCardVisible = true;
}

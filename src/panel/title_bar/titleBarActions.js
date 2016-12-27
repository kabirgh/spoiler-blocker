import {action} from "mobx";
import MainStore from "../common/MainStore";

module.exports = {
	showAddCard: action(showAddCard),
	showDownloadCard: action(showDownloadCard)
};

function showAddCard() {
	MainStore.isAddCardVisible = true;
}

function showDownloadCard() {
	MainStore.isDownloadCardVisible = true;
}

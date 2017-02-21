import {action} from "mobx";
import MainStore from "../common/MainStore";
import commonActions from "../common/commonActions";

// TODO: ES2015
module.exports = {
	saveAddList: action(saveAddList),
	hideAddCard: action(hideAddCard)
};

function saveAddList(title, tagString) {
	const tagArr = commonActions.tagStringToArray(tagString);
	return commonActions.addNewList(title, tagArr);
}

function hideAddCard() {
	MainStore.isAddCardVisible = false;
}

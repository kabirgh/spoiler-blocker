import {action} from "mobx";
import MainStore from "../common/MainStore";

module.exports = {
	showAddCard: action(showAddCard)
};

function showAddCard() {
	MainStore.isAddCardVisible = true;
}

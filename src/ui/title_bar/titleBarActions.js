import {action} from "mobx";
import store from "../store";

module.exports = {
	showAddCard: action(showAddCard)
};

function showAddCard() {
	store.isAddCardVisible = true;
}
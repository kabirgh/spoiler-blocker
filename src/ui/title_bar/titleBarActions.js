import store from "../store";

module.exports = {
	showAddCard: showAddCard
};

function showAddCard() {
	store.isAddCardVisible = true;
}
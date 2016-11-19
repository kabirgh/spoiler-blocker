import store from "../store";

module.exports = {
	showAddCard: showAddCard
};

function showAddCard() {
	store.addListAction = true;
}
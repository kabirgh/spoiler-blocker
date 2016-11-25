import store from "../store";

module.exports = {
	toggleCaseSensitivity: toggleCaseSensitivity,
	removeList: removeList
};

function toggleCaseSensitivity(index) {
	store.spoilers[index]["isCaseSensitive"] = !store.spoilers[index]["isCaseSensitive"];
}

function removeList(index) {
	store.spoilers.splice(index, 1);
}
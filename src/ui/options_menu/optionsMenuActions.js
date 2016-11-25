import store from "../store";

module.exports = {
	toggleCaseSensitivity: toggleCaseSensitivity
};

function toggleCaseSensitivity(index) {
	store.spoilers[index]["isCaseSensitive"] = !store.spoilers[index]["isCaseSensitive"];
}
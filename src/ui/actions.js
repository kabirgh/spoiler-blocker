import store from "./store";

module.exports = {
	editList: editList,
	removeList: removeList
};

function removeList(index) {
	store.spoilers.splice(index, 1);
}


function editList(index, title, tags) {
	console.log("editList called");

	store.spoilers[index]["title"] = title;
	store.spoilers[index]["tags"] = tags;

	console.log("spoiler tags for 1st lists on next line");
	console.log(store.spoilers[0]["tags"]);
}

// TODO: sync to chrome storage
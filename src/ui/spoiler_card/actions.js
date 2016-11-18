function addSpoilerList(title, tags) {
	return {
		type: "ADD_LIST",
		title: title,
		tags: tags
	};
}

function removeSpoilerList(title) {
	return {
		type: "REMOVE_LIST",
		title: title
	};
}

function editSpoilerList(title, tags) {
	return {
		type: "EDIT_LIST",
		title: title,
		tags: tags
	};
}
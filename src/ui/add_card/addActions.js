import store from "../store";

// TODO: ES2015
module.exports = {
	saveAddList: saveAddList
};

// TODO: error msg for empty title/tags
function saveAddList(title, tagString) {
	console.log("we at saveAddList");
	if (isDuplicateTitle(title)) {
		// TODO: change to false as soon as text changes
		store.duplicateTitles = true;
	}
	else {
		console.log("save list event");
		store.spoilers.push({
			title: title,
			isActive: true,
			isCaseSensitive: store.defaultCaseSensitivity,
			hidePref: store.defaultHidePref,
			tags: tagStringToArray(tagString)
		});
		console.log("new spoiler list on next line");
		console.log(store.spoilers.slice());
	}
}

function isDuplicateTitle(title) {
	for (let i=0; i<store.titles.length; i++) {
		if (title.trim() === store.titles[i].trim()) {
			return true;
		}
	}

	return false;
}

function tagStringToArray(tagString) {
	const tagArr = tagString.split(",");
	return tagArr.map(tag => tag.trim());
}
import store from "../store";

export default function saveAddList(title, tagString) {
	if (isDuplicateTitle(title)) {
		// TODO: change to false as soon as text changes
		store.duplicateTitles = true;
	}
	else {
		store.spoilers.push({
			title: title,
			isActive: true,
			isCaseSensitive: store.defaultCaseSensitivity,
			hidePref: store.defaultHidePref(),
			tags: tagStringToArray(tagString)
		});
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
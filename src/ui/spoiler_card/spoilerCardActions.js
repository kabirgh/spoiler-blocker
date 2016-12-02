import {action} from "mobx";
import MainStore from "../MainStore";

// TODO: ES2015
module.exports = {
	editTags: action(editTags)
};

// TODO: disallow duplicate tags?
function editTags(index, title, tags) {
	console.log("editTags called");

	MainStore.spoilers[index]["title"] = title;
	MainStore.spoilers[index]["tags"] = tagStringToArray(tags);

	console.log("spoiler tags for 1st list on next line");
	console.log(MainStore.spoilers[0]["tags"]);
}

function tagStringToArray(tagString) {
	const tagArr = tagString.split(",");
	return tagArr.map(tag => tag.trim());
}
// TODO: sync to chrome storage
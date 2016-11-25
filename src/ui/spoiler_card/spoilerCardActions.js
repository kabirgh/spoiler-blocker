import {action} from "mobx";
import store from "../store";

// TODO: ES2015
module.exports = {
	editTags: action(editTags)
};

// TODO: disallow duplicate tags?
function editTags(index, title, tags) {
	console.log("editTags called");

	store.spoilers[index]["title"] = title;
	store.spoilers[index]["tags"] = tagStringToArray(tags);

	console.log("spoiler tags for 1st list on next line");
	console.log(store.spoilers[0]["tags"]);
}

function tagStringToArray(tagString) {
	const tagArr = tagString.split(",");
	return tagArr.map(tag => tag.trim());
}
// TODO: sync to chrome storage
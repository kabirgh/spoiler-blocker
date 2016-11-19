import { createStore } from "redux";

let store = 
{
	"spoilers": [
		{
			"title": "spoiler-tag1-tag2",
			"isActive": true,
			"isCaseSensitive": true,
			"hidePref": "overlay",
			"tags": ["tag1", "tag2"]
		},
		{
			"title": "all-posts",
			"isActive": true,
			"isCaseSensitive": false,
			"hidePref": "overlay",
			"tags": ["a", "b", "c"]
		}
	],

	"addListButtonPressed": false
};
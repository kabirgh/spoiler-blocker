import { createStore } from "redux";

let store = 
{
	"spoilers": {
		"spoiler-list-name":
		{
			"isActive": true,
			"isCaseSensitive": true,
			"hidePref": "overlay",
			"tags": ["tag1", "tag2"]
		},
		"all-posts":
		{
			"isActive": true,
			"isCaseSensitive": false,
			"hidePref": "overlay",
			"tags": ["a", "b", "c"]
		}
	},

	"addListButtonPressed": false
};
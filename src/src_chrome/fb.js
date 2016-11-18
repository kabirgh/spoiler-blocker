/* global chrome */
import $ from "jquery";
import hideFacebookPosts from "../site_logic/fb-common";

const testSpoilersObj = 
	{
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
			"tags": ["a", "B", "c"]
		}
	};

let globalSpoilersObj;
chrome.storage.sync.get("spoilersObj", function(storage) {
	if (storage.spoilersObj !== undefined) {
		console.log("Received spoilersObj: " + JSON.stringify(storage.spoilersObj));
		globalSpoilersObj = storage.spoilersObj;
	}
	else {
		console.log("No spoilersObj in storage. Initialising to testSpoilersObj");
		globalSpoilersObj = testSpoilersObj;
	}
});

$(document).ready( function() {
	hideFacebookPosts(globalSpoilersObj);
});

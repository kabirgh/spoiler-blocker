/* global chrome */
import $ from "jquery";
import hideContent from "../commons/logic";
import {fbConfig} from "../commons/site_config/fbConfig";

const testSpoilersArr = 
	[
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
	];

let globalSpoilersArr;
chrome.storage.sync.get("spoilersArr", function(storage) {
	if (storage.spoilersArr !== undefined) {
		console.log("Received spoilersArr: " + storage.spoilersArr);
		console.log(storage.spoilersArr === []);
		globalSpoilersArr = storage.spoilersArr;
	}
	else {
		console.log("No spoilersArr in storage. Initialising to testSpoilersArr");
		globalSpoilersArr = testSpoilersArr;
	}
});

$(document).ready( function() {
	hideContent(globalSpoilersArr, fbConfig);
});

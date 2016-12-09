/* global chrome */
import $ from "jquery";
import hideContent from "./common/mainLogic";
import {fbConfig} from "./common/site_config/fbConfig";


let globalSpoilersArr;
chrome.storage.local.get("spoilersArr", function(obj) {
	if (obj["spoilersArr"] !== undefined) {
		globalSpoilersArr = obj["spoilersArr"];
	}
	else {
		console.log("No spoilersArr in storage. Initialising to empty array");
		globalSpoilersArr = [];
	}
});

$(document).ready( function() {
	hideContent(globalSpoilersArr, fbConfig);
});

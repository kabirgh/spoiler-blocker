/* global chrome */
var spoilersObj = {};

// Get list of tags from persistent storage
chrome.storage.sync.get("allTags", function(allTags) {
	if (!chrome.runtime.error) {
		if (allTags.allTags != null) {
			spoilersObj = allTags.allTags;
		}
		else {
			spoilersObj = {};
		}
	}
	else {
		console.log("A runtime error occurred when retrieving the allTags object from storage.");
	}
});

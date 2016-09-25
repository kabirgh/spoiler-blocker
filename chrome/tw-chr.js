/* global chrome, Promise */

var spoilersObj = {};
var hidePref;

// Promise for async get tags
var p1 = new Promise( function(resolve, reject) {
	// Get list of tags from persistent storage
	chrome.storage.sync.get("allTags", function(allTags) {
		if (!chrome.runtime.error) {
			resolve(allTags);
		}
		else {
			reject("runtime error");
		}
	});
});


// Get user preferences
chrome.storage.sync.get("prefs", function(prefs) {
	hidePref = prefs.prefs["hide"];
	console.log("hide pref: " + hidePref);
});


// Call rest of code when document is ready and promise has been fulfilled
jQuery(document).ready( function($) {
	p1.then( function(allTags) {
		if (allTags.allTags != null) {
			spoilersObj = allTags.allTags;
		}
		else {
			spoilersObj = {};
		}

		console.log("START");
		findStream();
		observeBody();
	});
});

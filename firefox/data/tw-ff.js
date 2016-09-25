/* global self, MutationSummary */

var spoilersObj = {};
var hidePref;

// Get all tags in js object from index.js
self.port.on("spoilers", function(allTags) {
	// Put all tags of active lists in array
	spoilersObj = allTags;
});

// Get user preferences
self.port.on("prefs", function(preferences) {
	hidePref = preferences["hide"];
});

// On page load
jQuery(document).ready( function($) {
	console.log("START");
	findStream();
	observeBody();
});
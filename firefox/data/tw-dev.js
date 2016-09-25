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


// Hide all tweets that were loaded when documentready fired
function findStream() {	
	var target = $(".stream");

	if (target.length > 0) {
		// Get all tweets loaded on document ready
		var loadedTweets = $("li[data-item-type]").toArray();
		for (var i=0; i<loadedTweets.length; i++) {
			hideTweet(loadedTweets[i]);
		}

		// All tweets on page have been checked, make document visible
		document.documentElement.style.visibility = '';

		// Get tweets loaded on scroll
		var tweetObs = new MutationSummary({
			callback: newTweetsCallback,
			rootNode: target[0],
			queries: [{
				element: "li[data-item-type]"
			}]
		});
	}
}
var spoilerLists = [];

// Get all tags in js object from index.js
self.port.emit("get-spoilers", "true");
self.port.on("sending-spoilers", function(allTags) {
	for (var key in allTags) {
		spoilerLists = spoilerLists.concat(allTags[key]);
	}
});

jQuery(document).ready( function($) {
	console.log("START");

	var target = $(".stream");

	if (target.length > 0) {

		// Get all tweets loaded on document ready
		var loadedTweets = $("li[data-item-type]").toArray();
		for (var i=0; i<loadedTweets.length; i++) {
			hideTweet(loadedTweets[i]);
		}

		function hideTweet(tweetNode) {
			var tweetText = $(tweetNode).find("p").text();

			for (var i=0; i<spoilerLists.length; i++) {
				// if tweet text contains a spoiler
				if (tweetText.indexOf( spoilerLists[i] ) > -1) {
					console.log(tweetText);
				}
			}
		}

		// Get all tweets loaded on scroll
		var tweetObs = new MutationSummary({
			callback: newTweetsCallback,
			rootNode: target[0],
			queries: [{
				element: "li[data-item-type]"
			}]
		});

		function newTweetsCallback(summaries) {
			summaries[0].added.forEach( function(node) {
				hideTweet(node);
			});
		}
		
	}
});
var spoilerList = [];

chrome.storage.sync.get("allTags", function(allTags) {
	if (!chrome.runtime.error) {
		for (var key in allTags) {
			spoilerList = spoilerList.concat(allTags[key]);
		}
		console.log(spoilerList);
	}
	else {
		console.log("runtime error");
	}
});


jQuery(document).ready( function($) {
	console.log("START");

	var spoilersArr = ["the", "here", "li"];

	var target = $(".stream");

	if (target.length > 0) {

		// Get all tweets loaded on document ready
		var loadedTweets = $("li[data-item-type]").toArray();
		for (var i=0; i<loadedTweets.length; i++) {
			hideTweet(loadedTweets[i]);
		}

		function hideTweet(tweetNode) {
			tweetNode = $(tweetNode);

			// Adblocker was hiding 'tweets', but program was detecting spoilers within
			// These 'tweets' had height 0, so this weeds those out
			if (tweetNode.height() <= 0) return;

			var tweetText = tweetNode.find("p").text();

			toHide = false;
			for (var i=0; i<spoilersArr.length; i++) {
				// if tweet text contains a spoiler
				if (tweetText.indexOf( spoilersArr[i] ) > -1) {
					// tweetNode should be hidden
					toHide = true;
					console.log(tweetText);
					tweetNode.remove();
					break;
				}
			}

			
		}

		// Get tweets loaded on scroll
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

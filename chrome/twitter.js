jQuery(document).ready( function($) {
	console.log("START");

	var spoilersArr = ["the", "here"];
	var target = $(".stream");

	if (target.length > 0) {

		// Get all tweets loaded on document ready
		var loadedTweets = $("li[data-item-type]").toArray();
		for (var i=0; i<loadedTweets.length; i++) {
			hideTweet(loadedTweets[i]);
		}

		function hideTweet(tweetNode) {
			var tweetText = $(tweetNode).find("p").text();

			for (var i=0; i<spoilersArr.length; i++) {
				// if tweet text contains a spoiler
				if (tweetText.indexOf( spoilersArr[i] ) > -1) {
					console.log(tweetText);

					// $(tweetNode).css({"position":"relative"});

					// $(tweetNode).wrapInner("<div class='sb-overlay'></div>").children(".sb-overlay")
					// .css({"position":"absolute", "top":"0", "left":"0", "right":"0", "bottom":"0", 
					// 	"backgroundColor":"white", "z-index":"1000"});
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
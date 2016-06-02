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
				}
			}

			if (toHide) {
				// Spoiler overlay
				newDiv = $(document.createElement("div")).css({
					'position': 'absolute',
					'top': 0,
					'left': 0,
					'background-color': 'white',
					'width': '100%',
					'height': '99%',
					'z-index': 1
				});

				lineHeight = tweetNode.height() * 0.9;

				// Spoiler text
				newDiv.append($('<p/>').text('Spoiler!').css({
					'position': 'absolute',
					'top': 0,
					'left': 0,
					'background-color': 'white',
					'width': '100%',
					'height': '100%',
					'font-size': 40,
					'text-align': 'center',
					'line-height': lineHeight.toString() + 'px',
					'font-family': 'Copperplate',
					'color': 'red'
				}));

				// Absolutely positioned element needs a positioned ancestor
				// This does not break any of twitter's formatting (far as I have seen)
				tweetNode.css({
					'position': 'relative'
				})

				newDiv.click(function() {
					$(this).hide()
				});

				tweetNode.append(newDiv);
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

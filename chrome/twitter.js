var spoilerList = [];

// Promise for async get tags
var p1 = new Promise(function(resolve, reject) {
	chrome.storage.sync.get("allTags", function(allTags) {
		if (!chrome.runtime.error) {
			resolve(allTags);
		}
		else {
			reject("runtime error");
		}
	});
});

// hide document until code is run
document.documentElement.style.visibility = 'hidden';
document.addEventListener('DOMContentLoaded', function() {
	console.log("START");

	p1.then(function (allTags) {
		inspectPage(allTags.allTags);
	})
});

function inspectPage (spoilersArr) {
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
			// These 'tweets' had very small heights, so this weeds those out
			if (tweetNode.height() <= 2) return;

			var tweetText = tweetNode.find("p").text();

			var toHide = false;
			var listTitle = null
			for (var i = 0; i < spoilersArr.length; i++) {
				// if tweet text contains a spoiler
				for (var j = 0; j < spoilersArr[i].tags.length; j++) {
					if (tweetText.indexOf( spoilersArr[i].tags[j] ) > -1) {
						// tweetNode should be hidden
						toHide = true;
						listTitle = spoilersArr[i].title;
						break;
					}
				}
			}

			if (toHide) {
				// Spoiler overlay
				var hgt = '99%';

				newDiv = $(document.createElement("div")).css({
					'position': 'absolute',
					'top': 0,
					'left': 0,
					'background-color': 'white',
					'display': 'flex',
					'justify-content': 'center',
					'align-items': 'center',
					'text-align': 'center',
					'width': '100%',
					'height': hgt,
					'z-index': 1,
					'cursor': 'pointer',
					'font-size': 30,
					'font-family': 'Copperplate',
					'color': 'red'
				});

				newDiv.html('Spoiler!<br><br>Title: ' + listTitle);

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

		function newTweetsCallback(summaries) {
			summaries[0].added.forEach( function(node) {
				hideTweet(node);
			});
		}
	}
}

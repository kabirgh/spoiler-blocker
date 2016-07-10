// Get all tags in js object from index.js
var spoilersObj = {};
self.port.on("spoilers", function(allTags) {
	// Put all tags of active lists in array
	spoilersObj = allTags;
});

var prefs;
self.port.on("prefs", function(preferences) {
	prefs = preferences;
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

		// Get tweets loaded on scroll
		var tweetObs = new MutationSummary({
			callback: newTweetsCallback,
			rootNode: target[0],
			queries: [{
				element: "li[data-item-type]"
			}]
		});
		
	}

});

function newTweetsCallback(summaries) {
	summaries[0].added.forEach( function(node) {
		hideTweet(node);
	});
}


function hideTweet(tweetNode) {
	tweetNode = $(tweetNode);

	// Adblocker was hiding 'tweets', but program was detecting spoilers within
	// These 'tweets' had very small heights, so this weeds those out
	if (tweetNode.height() <= 2) return;

	var tweetText = tweetNode.find("p").text();

	var listTitle = null;
	for (var title in spoilersObj) {
		if (!spoilersObj.hasOwnProperty(title)) {
			// Not actually a list
			continue;
		}
		if (!spoilersObj[title].active) {
			// List is not active
			continue;
		}

		// if tweet text contains a spoiler
		for (var j = 0; j < spoilersObj[title].tags.length; j++) {
			if (tweetText.indexOf(spoilersObj[title].tags[j]) > -1) {
				// tweetNode should be hidden
				if (hidePref === "remove") {
					$(tweetNode).remove();
				}
				else if (hidePref === "overlay") {
					overlay(tweetNode, title);
				}
				else {
					console.log("Error in loading hide preference")
				}
				break;
			}
		}
	}
}

function overlay(elem, listTitle) {
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
		'z-index': 7,
		'cursor': 'pointer',
		'font-size': 30,
		'font-family': 'Copperplate',
		'color': 'red'
	});

	newDiv.html('Spoiler!<br><br>Title: ' + listTitle);

	// Absolutely positioned element needs a positioned ancestor
	elem.css({
		'position': 'relative'
	});

	newDiv.click(function() {
		$(this).hide()
	});

	elem.append(newDiv);
}

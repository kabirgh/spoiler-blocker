var spoilersObj = {};
var hidePref;

// Get all tags in js object from index.js
self.port.on("spoilers", function(allTags) {
	// Put all tags of active lists in array
	spoilersObj = allTags;
});

// Get user preferences
var prefs;
self.port.on("prefs", function(preferences) {
	hidePref = preferences["hide"];
});


// On page load
jQuery(document).ready( function($) {
	inspectPage();
});


// Hide all tweets that were loaded when documentready fired
function inspectPage() {
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


// Callback for mutationsummary that finds tweets added after domcontentloaded event
function newTweetsCallback(summaries) {
	summaries[0].added.forEach( function(node) {
		hideTweet(node);
	});
}


// Hides tweets by overlaying or removing them, if text contains a case-sensitive keyword
// listed in the global spoilers object (only active lists)
function hideTweet(elem) {
	$elem = $(elem);

	// Adblocker was hiding 'tweets', but program was detecting spoilers within
	// These 'tweets' had very small heights, so this weeds those out
	if ($elem.height() <= 2) return;

	var tweetText = $elem.find("p").text();
	// console.log(tweetText);

	for (var title in spoilersObj) {
		if (!spoilersObj.hasOwnProperty(title) || !spoilersObj[title]["active"]) {
			// Not actually a list or list is inactive
			continue;
		}
		
		for (var j=0; j<spoilersObj[title]["tags"].length; j++) {
			// if tweet text contains a spoiler
			if (tweetText.indexOf(spoilersObj[title]["tags"][j]) > -1) {
				// hide tweet
				if (hidePref === "remove") {
					$($elem).remove();
				}
				else if (hidePref === "overlay") {
					overlay($elem, title);
				}
				else {
					console.log("Error in loading hide preference. Found " + 
							hidePref + " instead of 'overlay' or 'remove'. Defaulting to overlay");
						overlay($elem, title);
				}
				break;
			}
		}
	}
}

function overlay($elem, listTitle) {
	var hgt = '99%';

	$newDiv = $(document.createElement("div")).css({
		'position': 'absolute',
		'top': 0,
		'left': 0,
		'background-color': 'white',
		'opacity': 0.975,
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

	$newDiv.html('Spoiler!<br><br>Title: ' + listTitle);

	// Absolutely positioned element needs a positioned ancestor
	$elem.css({
		'position': 'relative'
	});

	$newDiv.click(function() {
		$(this).hide()
	});

	$elem.append($newDiv);
}

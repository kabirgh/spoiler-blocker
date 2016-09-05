/* global self */
var spoilersObj = {};

// Get all tags json object from index.js
self.port.on("spoilers", function(allTags) {
	spoilersObj = allTags;
});

var domListenerRemoved = false;

document.documentElement.style.visibility = 'hidden';

// On page load
jQuery(document).ready(function($) {
	console.log("START");

	// In case no stream found, make visible on load
	window.onload = function () {
		document.documentElement.style.visibility = 'visible';
	};

	addDomListener();
	observeBody();
});


// Add DOMNodeInserted listener with callback findFeed. Listener is removed after
// 5 second timeout if feed is not found
function addDomListener() {
	domListenerRemoved = false;

	// Check for feed_stream's existence
	document.addEventListener("DOMNodeInserted", findFeed);
	console.log("Added DOMNodeInserted listener");

	// Timeout DOMNode listener after 5 seconds so non-newsfeed facbeook pages do not lag
	window.setTimeout( function() {
		if (domListenerRemoved === false) {
			document.removeEventListener("DOMNodeInserted", findFeed);
			console.log("Feed not found. DOMNodeInserted listener removed");
		}
	},
	5000);
}


// Set mutationobserver on <body> element. Changes to its class attribute
// indicate new fb webpage has been loaded
function observeBody() {
	// Look for feed using domlistener
	var bodyObserver = new MutationObserver( function(mutationRecord) {
		mutationRecord.forEach( function() {
			addDomListener();
		});
	});

	// trigger callback if body class changes
	bodyObserver.observe($("body")[0], {
		attributeFilter: ["class"]
	});
}


// Looks for the element with div id beginning with "feed_stream"
// and passes it to the mutation summary
function findFeed() {
	var feed = $("div[id^='feed_stream']");

	// if no feed is found
	if (feed.length === 0) {
		console.log("no streams");
	}

	// if the feed is found
	else {
		console.log("target ID is " + feed.attr("id"));

		// look for new div elements using mutation summary
		var postObserver = new MutationSummary({
			callback: observeHyperFeed,
			rootNode: feed[0],
			queries: [{
				element: "div"
			}]
		});

		document.removeEventListener("DOMNodeInserted", findFeed);
		console.log("Feed found. DOMNodeInserted listener removed");
		domListenerRemoved = true;

		// Hide the posts that were loaded on document ready -
		// mutation summary won't detect these
		hidePosts( $("div#substream_0") );
		hidePosts( $("div#substream_1") );
		document.documentElement.style.visibility = 'visible';
	}
}


function observeHyperFeed(summaries) {
	// Filter all <div> elements with attr id beginning with userContentWrapper
	summaries[0].added.forEach( function(node) {
		var $elem = $(node).filter("[class^='userContentWrapper']");
		// if the element is not a nested content wrapper
		if ($elem.parent().closest("[class^='userContentWrapper']").length === 0) {
			hidePosts($elem);
		}
	});
}

// Hides posts by overlaying or removing them, if text contains a case-sensitive keyword
// listed in the global spoilers object (only active lists)
function hidePosts(elem) {
	var $elem = $(elem);

	if ($elem.length === 0) return;

	// Get all text from the post, including author, comments and content
	var postText = $elem.text();
	console.log(postText);

	for (var title in spoilersObj) {
		if (!spoilersObj.hasOwnProperty(title) || !spoilersObj[title]["active"]) {
			// Not actually a list or list is inactive
			continue;
		}

		// Check case-sensitivity option for this list. If false (insensitive),
		// convert both tag and tweet text to lower case before indexOf
		var caseSens = spoilersObj[title]["case-sensitive"];
		if (caseSens === false) {
			postText = postText.toLowerCase();
		}

		for (var j=0; j<spoilersObj[title]["tags"].length; j++) {

			var tag = spoilersObj[title]["tags"][j];
			if (caseSens === false) {
				tag = tag.toLowerCase();
			}

			var hidePref = spoilersObj[title]["hide-pref"];

			// if post text contains a spoiler
			if (postText.indexOf(tag) > -1) {
				// hide post
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


// Adds a translucent opaque div on top of a given elem
function overlay($elem, listTitle) {
	// Add overlay only once
	if ($elem.children().hasClass("spoiler-overlay") === true) {
		return;
	}

	var $newDiv = $(document.createElement("div")).css({
		'position': 'absolute',
		'top': 0,
		'left': 0,
		'background-color': 'white',
		'opacity': 0.99,
		'display': 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		'text-align': 'center',
		'width': '100%',
		'height': '99%',
		'z-index': 7, // arbitrary large z-index to place overlay on top
		'cursor': 'pointer',
		'font-size': 30,
		'font-family': 'Eczar',
		'color': 'black'
	});

	$newDiv.html('Spoiler!<br><br>Title: ' + listTitle);

	$newDiv.addClass("spoiler-overlay");

	// Absolutely positioned element needs a relatively positioned ancestor
	$elem.css({
		'position': 'relative'
	});

	$newDiv.click( function() {
		$(this).hide()
	});

	$elem.append($newDiv);
}


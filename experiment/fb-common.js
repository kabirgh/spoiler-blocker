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


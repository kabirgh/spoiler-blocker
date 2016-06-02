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

	// Check for feed_stream's existence
	document.addEventListener("DOMNodeInserted", findFeed);

	var contentObserver = new MutationSummary({
		callback: contentObsCallback,
		queries: [{
			element: "div[id='stream_pagelet']"
		}]
	});

	function contentObsCallback(summaries) {
		console.log(summaries[0]);
	}

	// Looks for the element with div id beginning with "feed_stream" and passes it to the mutation summary
	function findFeed() {
		var feed = $("div[id^='feed_stream']");

		// if no feed is found
		if ( $(feed).length === 0 ) {
			console.log("no streams");
		}

		// if the feed is found
		else {
			console.log("target ID is " + $(feed[0]).attr("id"));

			// look for new div elements
			var postObserver = new MutationSummary({
				callback: hidePosts,
				rootNode: feed[0],
				queries: [{
					element: "div"
				}]
			});

			document.removeEventListener("DOMNodeInserted", findFeed);
			console.log("DOMNodeInserted listener removed");
		}
	}


	function hidePosts(summaries) {
		// Filter all <div> elements with attr id beginning with hyperfeed
		// that have <p> elements as descendants
		// which contain any of the spoilers in spoilersArr.
		// Give these elements the "long-string-..." attribute.
		summaries[0].added.forEach( function(node) {
			$(node).filter("div[id^='hyperfeed']")
			// .has( containsAny("p", spoilersArr) )
			.attr("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");;
		})
	}


	// Return string output for jQuery selector to check if element with the
	// specified tag contains any of the text in stringArr.
	function containsAny(tag, stringArr) {
		var stringOutput = tag + ":contains(' " + stringArr[0] + " ')";

		for (var i=1; i<stringArr.length; i++) {
			stringOutput += ", " + tag + ":contains(' " + stringArr[i] + " ')";
		}

		return stringOutput;
	}
});

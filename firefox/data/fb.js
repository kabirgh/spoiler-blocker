$(document).ready(function () {
	console.log("START");

	var spoilersArr = ["the", "a"];
	var streamId = "substream_0";
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	// Find new streams
	var streamObserver = new MutationObserver( function(mutations) {
		console.log("observing");

		mutations.forEach( function(mutation) {
			$(mutation.addedNodes).filter("div[id^='substream']")
			.each( function() {
				var streamID = $(this).attr("id");
				$("div[id='" + streamID + "']")
				.find("div[id^='hyperfeed_story']")
				.each( function() {
					console.log("each ID " + $(this).attr("id"));
					$(this).attr("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
				});
			});
		});
		
	});

	// Check for feed_stream's existence
	document.addEventListener("DOMNodeInserted", findFeed);

	// Looks for the element with div id beginning with "feed_stream" and passes it to the mutation observer
	function findFeed() {
		var feed = $("div[id^='feed_stream']");

		// if no feed is found
		if ( $(feed).length === 0 ) {
			console.log("no streams");
		}

		// if the feed is found
		else {
			console.log("target ID is " + $(feed[0]).attr("id"));

			// Observe children of feed
			streamObserver.observe(feed[0], {
				childList: true
			});

			document.removeEventListener("DOMNodeInserted", findFeed);
			console.log("event removed");
		}
	}


	// Applies the attribute "long-string-..." to elements containing spoilers in descendants of root
	function findPosts(parentId) {
		console.log("parent ID " + parentId);

		// Find all <div> elements with attr id beginning with hyperfeed_story
		// that have <p> elements as descendants
		// which contain any of the spoilers in spoilersArr.
		// Give these elements the "long-string-..." attribute.
		var posts = $("div[id^='" + parentId + "']").find("div[id^='hyperfeed_story']")
						.attr("story", "yesitiszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
						.has( containsAny("p", spoilersArr) )
						.attr("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
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




$(document).ready(function () {
	console.log("START");

	var spoilersArr = ["the", "a"];
	var streamId = "substream_0";
	var target = undefined;
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	
	// var feedObserver = new MutationObserver( function(mutations) {
	// 	console.log("checking for feed...");

	// 	mutations.forEach( function(mutation) {
	// 		$(mutation.addedNodes).each( function() {
	// 			console.log(this);
	// 		});
			
	// 	});	
	// });

	// Find new streams
	var streamObserver = new MutationObserver( function(mutations) {
		$(mutations.addedNodes)
		.filter("div[id^='substream']")
		.each( function() {
			console.log("new substream added: " + $(this).attr("id"));
			findPosts( $(this).attr("id") );
		});
	});

	var initialCheck = true;

	// Check for feed_stream's existence
	if (target === undefined) {
		document.addEventListener("DOMNodeInserted", function() {
			// check all new substreams for spoiler posts
			var streams = $("div[id^='feed_stream']");

			if ( $(streams).length === 0 ) {
				console.log("no streams");
				findPosts(streamId);
			}
			else {
				target = streams[0];
				console.log("target ID is " + $(target).attr("id") + " and class is " +  $(target).attr("class"));
			}
		});
		// console.log("target undefined");

		// feedObserver.observe(document.body, {
		// 	childList: true,
		// 	subtree: true
		// });

		// $(window).arrive("div[id^='feed_stream']", function() {
		// 	// 'this' refers to the newly created element
		// 	target = this;
		// 	console.log("found feed: " + $(this).attr("id"));
		// });
	}

	// If feed_stream has been found, check the feed for new substreams
	else if (target !== undefined && initialCheck === true) {
		console.log("target defined");
		console.log("target ID is " + $(target).attr("id"));
		// Observe children of feed
		streamObserver.observe(target, {
			childList: true
		});
		// Only call streamObserver.observe once
		initialCheck = false;
		// feedObserver.disconnect();
	}


	// document.addEventListener("DOMNodeInserted", function() {
	// 	// check all new substreams for spoiler posts
	// 	var streams = $("div[id='" + streamId + "']").nextAll("div[id^='substream']");

	// 	// if there is <=1 stream (substream_0 or none)
	// 	if ( $(streams).length === 0 ) {
	// 		console.log("no streams");
	// 		findPosts(streamId);
	// 	}

	// 	// if there is >1 substream
	// 	else {
	// 		$(streams).each( function() {
	// 			streamId = $(this).attr("id");
	// 			findPosts(streamId);
			
	// 			console.log("this stream is " + streamId);
	// 		});
	// 	}
	// });


	// Applies the attribute long-string-..." to elements containing spoilers in descendants of root
	function findPosts(parentId) {
		// Find all <div> elements with attr id beginning with hyperfeed_story
		// that have <p> elements as descendants
		// which contain any of the spoilers in spoilersArr.
		// Give these elements the "long-string-..." attribute.
		var posts = $("div[id^='" + parentId + "']").find("div[id^='hyperfeed_story']")
						.has( containsAny("p", spoilersArr) )
						.attr("long-string-for-easy-inspection-spoil-block", "block");
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




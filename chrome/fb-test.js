"use strict";
jQuery(document).ready(function($) {
	console.log("START");

	// When body class changes, pollFeed is called with a timeout of 200ms.
	// When pollFeed finds feed node, observeFeedStream is called.
	// When observeFeedStream observes added nodes, filterPosts is called.
	observeBodyClass();
});


// Watches for changes to <body> element. Changes to its class attribute
// indicate new fb webpage has been loaded
function observeBodyClass() {
	console.log("Initial callback invocation")
	pollFeed();

	var bodyObserver = new MutationObserver( function(mutationRecord) {
		mutationRecord.forEach( function() {
			console.log("Body class changed, invoking callback");
			pollFeed();
		});
	});

	// trigger callback above if body class changes
	bodyObserver.observe($("body")[0], {
		attributeFilter: ["class"]
	});
}



// Calls observeFeedStream if feed element is found. Stops polling DOM after 50,000 ms
function pollFeed() {
	// ms since function was first called
	var count = 200;

	var feedChecker = setInterval( function() {
		console.log("Polling");
		var $feed = $("div[id^='feed_stream']");

		if ($feed.length !== 0) {
			console.log("Feed found");
			observeFeedStream($feed[0]);
			clearInterval(feedChecker);
		}
		else {
			count += 200;
		}

		// 5 seconds
		if (count == 5000) {
			console.log("Stopped polling");
			clearInterval(feedChecker);
		}
	},
	200);
}

// Observes for new nodes added to the feed node
function observeFeedStream(feed) {
	console.log("Main method");

	// look for new div elements using mutation summary
	var postObserver = new MutationObserver( function(mutationRecord) {
		mutationRecord.forEach( function(mutation) {
			var $posts = filterPosts(mutation.addedNodes);
		});
	});

	postObserver.observe(feed, {
		childList: true,
		subtree: true
	});
}

// Returns an array of jquery objects corresponding to fb posts
function filterPosts(nodeList) {
	var $posts = [];

	nodeList.forEach( function(node) {
		var $post = $(node).find("[class^='userContentWrapper']");
		// If the element is not a nested content wrapper
		if ($post[0] !== undefined && $post.parent().closest("[class^='userContentWrapper']").length === 0) {
			console.log("Post found, printing on next line");
			console.log($post[0]);
			$posts.push($post);
		}
	});

	return $posts;
}

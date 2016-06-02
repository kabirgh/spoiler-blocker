jQuery(document).ready( function($) {
	console.log("START");

	var spoilersArr = ["the", "a"];
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	// MutationObserver object
	var observerObject = new MutationObserver(mutationObjectCallback);

	// Passes first element of each mutation record to findSpoilers
	// First element because by observation is the only one needed... can use filter for more generalised results
	// Using a timeout of 500ms since the descendants are not added immediately
	function mutationObjectCallback(mutationRecordsList) {
	  console.log("mutationObjectCallback invoked.");
		console.log(mutationRecordsList);

	  mutationRecordsList.forEach(function(mutationRecord) {
			// setTimeout(findSpoilers, 500, mutationRecord.addedNodes[0]);
			// console.log(mutationRecord);
			var obs = new MutationObserver(callback);
			obs.observe(mutationRecord.addedNodes[0], {
				childList : true
			})
	  });
	}

	function callback(mutations) {
		console.log("callback");
		console.log(mutations);
	}

	// Takes a node
	// Should add the spoiler overlay... have not implemented that yet
	function findSpoilers(addedNode) {
		console.log($(addedNode).find("div[id^='hyperfeed_story']").find("a, p").text()
			// .addClass('spoiler_overlay')
		);

		$(".spoiler_overlay")
		.css({
			'opacity' : 0.4,
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'background-color': 'white',
			'width': '50px',
			'height': '50px',
			'z-index': 5000
		});
	}


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
			observerObject.observe(feed[0], {
				childList: true
			});

			document.removeEventListener("DOMNodeInserted", findFeed);
			console.log("event removed");
		}
	}
});

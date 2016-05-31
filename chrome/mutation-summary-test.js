$(document).ready(function () {
  console.log('Start');
  var patt = /hyperfeed_story*/

  function callbackFun (summaries) {
    summaries[0].added.forEach(function(node) {
      console.log($(node).filter("div[id^='hyperfeed_story']"));
    })
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
      var observerObject = new MutationSummary({
        rootNode: feed[0],
        callback: callbackFun,
        queries: [{ element: "div" }]
      });

			document.removeEventListener("DOMNodeInserted", findFeed);
			console.log("event removed");
		}
	}
})

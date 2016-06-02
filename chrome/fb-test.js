jQuery(document).ready( function($) {
	console.log("START");

	var spoilersArr = ["the", "here"];
	var target = $("div[id^='feed_stream']");

	if (target.length > 0) {

		// Get all posts loaded on document ready
		var loadedPosts = $("div[id^='hyperfeed']").toArray();
		for (var i=0; i<loadedPosts.length; i++) {
			hidePost(loadedPosts[i]);
		}

		function hidePost(postNode) {
			var postText = $(postNode).find("div[id^='hyperfeed']").find("p").text();

			for (var i=0; i<spoilersArr.length; i++) {
				// if post text contains a spoiler
				if (postText.indexOf( spoilersArr[i] ) > -1) {
					console.log(postText);
				}
			}
		}

		// Get all posts loaded on scroll
		var postObs = new MutationSummary({
			callback: newPostsCallback,
			rootNode: target[0],
			queries: [{
				element: "div"
			}]
		});

		function newPostsCallback(summaries) {
			summaries[0].added.forEach( function(node) {
				hidePost(node);
			});
		}
	}

});
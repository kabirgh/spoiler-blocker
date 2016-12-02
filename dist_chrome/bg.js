const testSpoilersArr = 
	[
		{
			"title": "spoiler-tag1-tag2",
			"isActive": true,
			"isCaseSensitive": true,
			"hidePref": "overlay",
			"tags": ["tag1", "tag2"]
		},
		{
			"title": "all-posts",
			"isActive": true,
			"isCaseSensitive": false,
			"hidePref": "overlay",
			"tags": ["a", "b", "c"]
		}
	];

printSpoilersArr();

setTimeout( function() { 
	chrome.storage.local.set({"spoilersArr": testSpoilersArr});
}, 
3000);

setTimeout( function() { 
	printSpoilersArr();
}, 
3000);

function printSpoilersArr() {
	chrome.storage.local.get("spoilersArr", function(object) {
		console.log("spoilersArr on next line");
		console.log(object["spoilersArr"]);
	});
}
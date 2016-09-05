/* global self */
var spoilersObj = {};

// Get all tags json object from index.js
self.port.on("spoilers", function(allTags) {
	spoilersObj = allTags;
});


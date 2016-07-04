// panel needs to send request to index.js
self.port.emit("get-spoilers", "true");
self.port.on("sending-spoilers", function(allTags) {

});

// Send the list of spoilers entered to index.js
function getInput() {
	var title = document.getElementById("title-input").value.trim();
	var tags = document.getElementById("tags-input").value;

	console.log(title);

	var tagArr = tags.split(",");
	for (var i=0; i<tagArr.length; i++) {
		tagArr[i] = tagArr[i].trim();
	}

	self.port.emit("new-list", {"title": title, "tags": tagArr});
}

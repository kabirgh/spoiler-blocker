// When add-on toolbar button is pressed
self.port.on("panel-visible", function() {
	var button = document.getElementById("title-button");
	button.onclick = getInput;
});

// Send the list of spoilers entered to index.js
function getInput() {
	var title = document.getElementById("title-input").value.trim();
	var tags = document.getElementById("tags-input").value;

	var tagArr = tags.split(",");
	for (var i=0; i<tagArr.length; i++) {
		tagArr[i] = tagArr[i].trim();
	}

	self.port.emit("new-list", {"title": title, "tags": tagArr});
}

// Send the list of spoilers entered to index.js
function getInput() {
	var title = document.getElementById("title-input").value.trim();
	var tags = document.getElementById("tags-input").value;

	var tagArr = tags.split(",");
	for (var i=0; i<tagArr.length; i++) {
		tagArr[i] = tagArr[i].trim();
	}

	chrome.storage.sync.get("allTags", function(listObj) {
		setLists(listObj.allTags);
	})

	function setLists(oldArr) {
		if (oldArr == null) oldArr = [];

		var newList = {"title": title, "tags": tagArr};
		oldArr.push(newList);

		chrome.storage.sync.set({"allTags": oldArr});

		chrome.storage.sync.get("allTags", function(listObj) {
			console.log(listObj);
		})
	}
}

function resetAll() {
	chrome.storage.sync.clear();
}

$(document).ready(function() {
	document.getElementById('submit-btn').addEventListener('click', getInput);
	document.getElementById('reset-all-btn').addEventListener('click', resetAll);
})

// Send the list of spoilers entered to index.js
function getInput() {
	var title = document.getElementById("title-input").value.trim();
	var tags = document.getElementById("tags-input").value;

	var tagArr = tags.split(",");
	for (var i=0; i<tagArr.length; i++) {
		tagArr[i] = tagArr[i].trim();
	}

	chrome.storage.local.get("lists", function(listObj) {
		setLists(listObj.lists);
	})

	function setLists(oldArr) {
		if (oldArr == null) oldArr = [];

		var newList = {"title": title, "tags": tagArr};
		oldArr.push(newList);

		chrome.storage.local.set({"lists": oldArr});

		chrome.storage.local.get("lists", function(listObj) {
			console.log(listObj);
		})
	}
}

function resetAll() {
	chrome.storage.local.clear();
}

$(document).ready(function() {
	document.getElementById('submit-btn').addEventListener('click', getInput);
	document.getElementById('reset-all-btn').addEventListener('click', resetAll);
})

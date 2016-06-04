// Send the list of spoilers entered to index.js
function processInput(title, tags) {
	title = title.trim();
	console.log(title, tags);

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

var app = angular.module('panelApp', [])
app.controller('panelController', function($scope) {
	$scope.titleString = "";
	$scope.tagString = "";
	$scope.getInput = function () {
		processInput($scope.titleString, $scope.tagString);
	}
	$scope.resetAll = resetAll;
})

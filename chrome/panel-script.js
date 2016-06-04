var app = angular.module('panelApp', [])
app.controller('panelController', function($scope) {
	$scope.titleString = "";
	$scope.tagString = "";
	$scope.allTags = [];
	$scope.displayTags = false;

	chrome.storage.sync.get("allTags", function(listObj) {
		if (listObj.allTags != null)
			$scope.allTags = listObj.allTags;
	})

	$scope.getInput = processInput;

	$scope.resetAll = resetAll;

	function processInput() {
		var title = $scope.titleString.trim();
		var tags = $scope.tagString;

		var tagArr = tags.split(",");
		for (var i=0; i<tagArr.length; i++) {
			tagArr[i] = tagArr[i].trim();
		}

		chrome.storage.sync.get("allTags", function(listObj) {
			if (!chrome.runtime.error) {
				setLists(listObj.allTags);
			}
			else {
				console.log("Bummer");
			}
		})

		function setLists(oldArr) {
			if (oldArr == null) oldArr = [];

			var newList = {"title": title, "tags": tagArr};
			oldArr.push(newList);

			chrome.storage.sync.set({"allTags": oldArr});

			$scope.$apply(function () {
				$scope.allTags = oldArr;
			})
		}
	}

	function resetAll() {
		$scope.allTags = [];
		chrome.storage.sync.clear();
	}
})

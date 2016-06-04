var app = angular.module('panelApp', [])
app.controller('panelController', function($scope) {
	$scope.titleString = "";
	$scope.tagString = "";
	$scope.allTags = [];
	$scope.displayTitles = false;
	$scope.displayTags = [];

	chrome.storage.sync.get("allTags", function(listObj) {
		if (listObj.allTags != null)
			$scope.allTags = listObj.allTags;
			for (var i = 0; i < $scope.allTags.length; i++) {
				$scope.displayTags[i] = false;
			}
	})

	$scope.getInput = processInput;

	$scope.resetAll = resetAll;

	$scope.showTags = function(idx) {
		for (var i = 0; i < $scope.displayTags.length; i++) {
			if (i != idx)
				$scope.displayTags[i] = false;
			else
				$scope.displayTags[i] = !$scope.displayTags[i];
		}
	}

	function processInput() {
		var title = $scope.titleString.trim();
		var tags = $scope.tagString;
		$scope.titleString = "";
		$scope.tagString = "";

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
				$scope.displayTags.push(false);
			})
		}
	}

	function resetAll() {
		$scope.allTags = [];
		$scope.displayTitles = [];
		chrome.storage.sync.clear();
	}
})

var app = angular.module('panelApp', [])

app.controller('panelController', function($scope) {
	$scope.titleString = "";
	$scope.tagString = "";

	// Form : [
	//         {
	//          list: {title:__, tags:[__,__]} ,
	//          display: true|false
	//         }
	//        ]
	$scope.allTags = [];

	// Display all the list titles
	$scope.displayTitles = false;

	chrome.storage.sync.get("allTags", function(listObj) {
		if (listObj.allTags != null) {
			// Does exist in storage
			for (var i = 0; i < listObj.allTags.length; i++) {
				$scope.allTags[i] = {
					list: listObj.allTags[i],
					display: false
				}
			}
		}
		else {
			console.log("Something went wrong with getting lists from storage");
		}
	})

	$scope.getInput = processInput;

	$scope.clearAll = clearAll;

	// Show tags when title is clicked in panel
	$scope.showTags = function(idx) {
		for (var i = 0; i < $scope.allTags.length; i++) {
			// Toggle this tag list, and close all others
			if (i != idx)
				$scope.allTags[i].display = false;
			else
				$scope.allTags[i].display = !$scope.allTags[i].display;
		}
	}

	function processInput() {
		var title = $scope.titleString.trim();
		var tags = $scope.tagString;
		$scope.titleString = "";
		$scope.tagString = "";

		// Split tags on commas and trim
		var tagArr = tags.split(",");
		for (var i=0; i<tagArr.length; i++) {
			tagArr[i] = tagArr[i].trim();
		}

		// Get old array of lists from $scope.allTags
		var oldArr = $scope.allTags.map(function(elem) {return elem.list});

		var newList = {"title": title, "tags": tagArr};
		oldArr.push(newList);

		// Update the lists in storage
		chrome.storage.sync.set({"allTags": oldArr});
		// Update local lists
		$scope.allTags.push({display: false, list: newList});
	}

	// Clear all lists from storage
	function clearAll() {
		$scope.allTags = [];
		$scope.displayTitles = false;
		chrome.storage.sync.set({"allTags": []});
	}
})

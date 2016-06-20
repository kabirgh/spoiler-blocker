var app = angular.module('panelApp', [])

app.controller('panelController', function($scope) {
	$scope.titleString = "";
	$scope.tagString = "";

	// allTags : {
	//            title: {
	//              tags: [tag1, tag2, ...],
	//              display: true|false,
	//              active: true|false
	//            }
	//           }
	$scope.allTags = {}

	// Display form for new lists
	$scope.showNewForm = false;

	chrome.storage.sync.get("allTags", function(listObj) {
		if (listObj.allTags != null) { // Does exist in storage
			// Need to explicitly call apply since angular does not automatically
			// apply async changes
			$scope.$apply(function () {
				$scope.allTags = listObj.allTags
			})
		}
		else {
			console.log("Something went wrong with getting lists from storage");
		}
	})

	$scope.getInput = processInput;

	$scope.clearAll = clearAll;

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

		// Update local lists
		$scope.allTags[title] = {
			"tags": tagArr,
			"display": false,
			"active": true
		};

		// Update the lists in storage
		chrome.storage.sync.set({"allTags": $scope.allTags});
	}

	// Clear all lists from storage
	function clearAll() {
		$scope.allTags = [];
		$scope.displayTitles = false;
		chrome.storage.sync.set({"allTags": []});
	}
})

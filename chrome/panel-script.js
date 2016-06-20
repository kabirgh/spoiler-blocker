var app = angular.module('panelApp', [])

app.controller('panelController', function($scope) {
	$scope.titleString = "";
	$scope.tagString = "";

	// allTags : {
	//            title: {
	//              tags: [tag1, tag2, ...],
	//              display: true|false,
	//              active: true|false,
	// 							editing: true|false
	//            }
	//           }
	$scope.allTags = {}

	// Display form for new lists
	$scope.showNewForm = false;

	// Title and tags being currently edited
	$scope.editingTitle = "";
	$scope.editingTags = ""

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

	$scope.getInput = getInput;
	$scope.clearAll = clearAll;
	$scope.editList = editList;
	$scope.editListSubmit = editListSubmit;
	$scope.editListCancel = editListCancel;
	$scope.deleteList = deleteList;

	function getInput() {
		processInput($scope.titleString, $scope.tagString);
		$scope.titleString = "";
		$scope.tagString = "";

		// Update the lists in storage
		chrome.storage.sync.set({"allTags": $scope.allTags});

		$scope.showNewForm = false;
	}

	function processInput(inputTitle, inputTags) {
		var title = inputTitle.trim();
		var tags = inputTags;

		// Split tags on commas and trim
		var tagArr = tags.split(",");
		for (var i=0; i<tagArr.length; i++) {
			tagArr[i] = tagArr[i].trim();
		}

		updateLocal(title, tagArr);
	}

	function updateLocal(title, tags) {
		$scope.allTags[title] = {
			"tags": tags,
			"display": true,
			"active": true
		};
	}

	// Clear all lists from storage
	function clearAll() {
		$scope.allTags = [];
		$scope.displayTitles = false;
		chrome.storage.sync.set({"allTags": []});
	}

	function editList(title) {
		oldList = $scope.allTags[title];
		oldList.newTitle = title;
		oldList.newTags = oldList.tags.join(', ');
		oldList.editing = true;
	}

	function editListSubmit(title) {
		var newTitle = $scope.allTags[title].newTitle;
		var newTags = $scope.allTags[title].newTags;

		// Remove old list
		delete $scope.allTags[title];

		processInput(newTitle, newTags);

		// Update the lists in storage
		chrome.storage.sync.set({"allTags": $scope.allTags});
	}

	function editListCancel(title) {
		list = $scope.allTags[title];
		delete list.newTitle;
		delete list.newTags;
		delete list.editing;
	}

	function deleteList(title) {
		delete $scope.allTags[title];
		chrome.storage.sync.set({"allTags": $scope.allTags});
	}
})

var app = angular.module('panelApp', [])

app.controller('panelController', function($scope) {
	$scope.titleString = "";
	$scope.tagString = "";

	// allTags : {
	//            title: {
	//              tags: [tag1, tag2, ...],
	//              active: true|false,
	//            }
	//           }
	$scope.allTags = {};

	// tagOptions : {
	//               title: {
	//                 display: true|false,
	// 							   editing: true|false
	//               }
	//              }
	$scope.tagOptions = {};

	// Display form for new lists
	$scope.showNewForm = false;

	chrome.storage.sync.get("allTags", function(listObj) {
		if (listObj.allTags != null) { // Does exist in storage
			// Need to explicitly call apply since angular does not automatically
			// apply async changes
			$scope.$apply(function () {
				if (!(listObj.allTags.length == 0)) {
					$scope.allTags = listObj.allTags;
					for (var title in $scope.allTags) {
					    if (!$scope.allTags.hasOwnProperty(title)) {
					        continue;
					    }
					    $scope.tagOptions[title] = {
								display: false,
								editing: false,
								newTitle: "",
								newTags: ""
							}
					}
				}
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
	$scope.toggleActivate = toggleActivate;

	function getInput() {
		processInput($scope.titleString, $scope.tagString, true);
		$scope.titleString = "";
		$scope.tagString = "";

		// Update the lists in storage
		updateChromeStorage();

		$scope.showNewForm = false;
	}

	function processInput(inputTitle, inputTags, active) {
		var title = inputTitle.trim();
		var tags = inputTags;

		// Split tags on commas and trim
		var tagArr = tags.split(",");
		for (var i=0; i<tagArr.length; i++) {
			tagArr[i] = tagArr[i].trim();
		}

		updateLocal(title, tagArr, active);
	}

	function updateLocal(title, tags, active) {
		$scope.allTags[title] = {
			tags: tags,
			active: active
		};

		$scope.tagOptions[title] = {
			display: true,
			editing: false,
			newTitle: "",
			newTags: ""
		}
	}

	function updateChromeStorage() {
		chrome.storage.sync.set({"allTags": $scope.allTags});
	}

	// Clear all lists from storage
	function clearAll() {
		$scope.allTags = {};
		$scope.tagOptions = {};
		updateChromeStorage();
	}

	function editList(title) {
		var options = $scope.tagOptions[title];
		options.newTitle = title;
		options.newTags = $scope.allTags[title].tags.join(', ');
		options.editing = true;
	}

	function editListSubmit(title) {
		var newTitle = $scope.tagOptions[title].newTitle;
		var newTags = $scope.tagOptions[title].newTags;
		var active = $scope.allTags[title].active;

		// Remove old list
		delete $scope.allTags[title];
		delete $scope.tagOptions[title];

		processInput(newTitle, newTags, active);

		// Update the lists in storage
		updateChromeStorage();
	}

	function editListCancel(title) {
		$scope.tagOptions[title] = {
			display: true,
			editing: false,
			newTitle: "",
			newTags: ""
		}
	}

	function deleteList(title) {
		delete $scope.allTags[title];
		delete $scope.tagOptions[title];
		updateChromeStorage();
	}

	function toggleActivate(title) {
		$scope.allTags[title].active = !$scope.allTags[title].active;
		updateChromeStorage();
	}
})

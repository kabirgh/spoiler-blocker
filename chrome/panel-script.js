var app = angular.module('panelApp', [])

app.controller('panelController', function($scope, $http, $timeout) {
	$scope.titleString = "";
	$scope.tagString = "";

	// allTags : {
	//            title: {
	//              tags: [tag1, tag2, ...],
	//              active: true|false,
	//				case-sensitive: true|false
	//            }
	//           }
	$scope.allTags = {};

	// tagOptions : {
	//               title: {
	//                 display: true|false,
	// 				   editing: true|false
	//               }
	//              }
	$scope.tagOptions = {};

	// Display form for new lists
	$scope.showNewForm = false;

	// Active and Inactive lists
	$scope.active = {};
	$scope.inactive = {};
	$scope.numActive = 0;
	$scope.numInactive = 0;

	// Whether to display all activated/deactivated lists
	$scope.seeMoreActive = false;
	$scope.seeMoreInactive = false;

	// Whether to show the alerts
	$scope.showDownloadAlert = false;
	$scope.showTitleAlert = false;

	// Options
	// {
	//   hide: overlay|remove
	// }
	$scope.prefs = {};


	chrome.storage.sync.get("allTags", function(obj) {
		$scope.$apply( function() {
			if (!obj.allTags) {
				console.log("allTags object does not exist. Initializing empty object");
				$scope.allTags = {};
				updateStorage();
			}
			else {
				$scope.allTags = obj.allTags;
			}

			for (var title in $scope.allTags) {
				if (!$scope.allTags.hasOwnProperty(title)) {
					continue;
				}

				if ($scope.allTags[title].active) {
					$scope.active[title] = $scope.allTags[title];
					$scope.numActive++;
				} else {
					$scope.inactive[title] = $scope.allTags[title];
					$scope.numInactive++;
				}

				$scope.tagOptions[title] = {
						display: false,
						editing: false,
						newTitle: "",
						newTags: ""
				}
			}
		});
	});


	chrome.storage.sync.get("prefs", function(obj) {
		$scope.$apply( function() {
			if (!obj.prefs) { // Does exist in storage
				console.log("prefs object does not exist. Initializing empty object");
				$scope.prefs = {"hide": "overlay"};
				chrome.storage.sync.set({prefs: $scope.prefs})
			}
			else {
				$scope.prefs = obj.prefs;
			}
		})
	})

	$scope.getInput = getInput;
	$scope.editList = editList;
	$scope.editListSubmit = editListSubmit;
	$scope.editListCancel = editListCancel;
	$scope.deleteList = deleteList;
	$scope.toggleActivate = toggleActivate;
	$scope.toggleSeeMoreActive = toggleSeeMoreActive;
	$scope.toggleSeeMoreInactive = toggleSeeMoreInactive;
	$scope.downloadList = downloadList;
	$scope.closeDownloadAlert = closeDownloadAlert;
	$scope.closeTitleAlert = closeTitleAlert;


	// Store new list title and tags
	function getInput() {
		// If title already exists
		if ($scope.allTags[$scope.titleString.trim()]) {
			displayTitleAlert();
			return;
		}

		// Defaults are active: true, caseSens: false
		processInput($scope.titleString, $scope.tagString, true, false);
		$scope.titleString = "";
		$scope.tagString = "";

		// Update the lists in storage
		updateStorage();

		$scope.showNewForm = false;
	}

	// Copy list title and tags into string and array. Pass to updateLocal
	// Defaults are active: true, caseSens: false
	function processInput(inputTitle, inputTags, active, caseSens) {
		var title = inputTitle.trim();
		var tags = inputTags;

		// Split tags on commas and trim
		var tagArr = tags.split(",");
		for (var i=0; i<tagArr.length; i++) {
			tagArr[i] = tagArr[i].trim();
		}

		updateLocal(title, tagArr, active, caseSens);
	}

	// Update UI to display new list
	// Defaults are active: true, caseSens: false
	function updateLocal(title, tags, active, caseSens) {
		$scope.allTags[title] = {
			"tags": tags,
			"active": active,
			"case-sensitive": caseSens
		};

		if (active) {
			$scope.active[title] = $scope.allTags[title];
			$scope.numActive++;
		} else {
			$scope.inactive[title] = $scope.allTags[title];
			$scope.numInactive++;
		}

		$scope.tagOptions[title] = {
			display: true,
			editing: false,
			newTitle: "",
			newTags: ""
		}
	}

	// Overwrite allTags in chrome storage with $scope.allTags
	function updateStorage() {
		chrome.storage.sync.set({"allTags": $scope.allTags});
	}

	// Show alert for duplicate title for 3 seconds
	function displayTitleAlert() {
		$scope.showTitleAlert = true;
		$timeout(function () {
			$scope.showTitleAlert = false;
		}, 3000);
	}

	function editList(title) {
		var options = $scope.tagOptions[title];
		options.newTitle = title;
		options.newTags = $scope.allTags[title].tags.join(', ');
		options.editing = true;
	}

	function editListSubmit(title) {
		var newTitle = $scope.tagOptions[title].newTitle;
		if ($scope.allTags[newTitle.trim()] && newTitle != title) {
			displayTitleAlert();
			return;
		}

		var newTags = $scope.tagOptions[title].newTags;
		var active = $scope.allTags[title].active;

		// Remove old list
		delete $scope.allTags[title];
		delete $scope.tagOptions[title];

		if (active) {
			delete $scope.active[title];
			$scope.numActive--;
		} else {
			delete $scope.inactive[title];
			$scope.numInactive--;
		}

		processInput(newTitle, newTags, active);

		// Update the lists in storage
		updateStorage();
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
		if ($scope.allTags[title].active) {
			delete $scope.active[title];
			$scope.numActive--;
		} else {
			delete $scope.inactive[title];
			$scope.numInactive--;
		}

		delete $scope.allTags[title];
		delete $scope.tagOptions[title];
		updateStorage();
	}


	// Change case-sensitivity for list
	function changeCaseSensitivity(title) {
		$scope.allTags[title]['case-sensitive'] = !$scope.allTags[title]['case-sensitive'];
		updateStorage();
	}


	function toggleActivate(title) {
		$scope.allTags[title].active = !$scope.allTags[title].active;
		if ($scope.allTags[title].active) {
			$scope.active[title] = $scope.allTags[title];
			delete $scope.inactive[title];
			$scope.numActive++;
			$scope.numInactive--;
		} else {
			delete $scope.active[title];
			$scope.inactive[title] = $scope.allTags[title];
			$scope.numActive--;
			$scope.numInactive++;
		}
		updateStorage();
	}

	function toggleSeeMoreActive() {
		$scope.seeMoreActive = !$scope.seeMoreActive;
	}

	function toggleSeeMoreInactive() {
		$scope.seeMoreInactive = !$scope.seeMoreInactive;
	}


	function downloadList(listID, newTitle) {
		$scope.downloadID = "";
		$scope.downloadTitle = "";

		if ($scope.allTags[newTitle.trim()]) {
			displayTitleAlert();
			return;
		}

		$http.get('https://salty-earth-11606.herokuapp.com/downloadList', {
			params: {
				id: listID
			}
		}).then(function(response) {
			if (response.data.Status == 'Success') {
				var title = newTitle.trim();
				var tags = response.data.list.tags;

				// Split tags on commas and trim
				var tagArr = tags.split(",");
				for (var i=0; i<tagArr.length; i++) {
					tagArr[i] = tagArr[i].trim();
				}

				updateLocal(title, tagArr, true);
				updateStorage();
			}
			else {
				$scope.showDownloadAlert = true;
			}
		})
	}

	function closeDownloadAlert() {
		$scope.showDownloadAlert = false;
	}

	function closeTitleAlert() {
		$scope.showTitleAlert = false;
	}
})

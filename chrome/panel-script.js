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

	// Active and Inactive lists
	$scope.active = {};
	$scope.inactive = {};
	$scope.numActive = 0;
	$scope.numInactive = 0;

	// Whether to display all activated/deactivated lists
	$scope.seeMoreActive = false;
	$scope.seeMoreInactive = false;

	// Options
	// {
	//   hide: overlay|remove
	// }
	$scope.prefs = {};


	chrome.storage.sync.get("allTags", function(listObj) {
		if (listObj.allTags != null) { // Does exist in storage
			// Need to explicitly call apply since angular does not automatically
			// apply async changes
			console.log(listObj)
			$scope.$apply(function () {
				if (listObj.allTags.length !== 0) {
					$scope.allTags = listObj.allTags;
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
				}
			})
		}
		else {
			// chrome.storage.sync.set({'allTags': {}})
			console.log("Something went wrong with getting lists from storage");
		}

		chrome.storage.sync.get("prefs", function(prefs) {
			if (prefs.prefs != null) { // Does exist in storage
				$scope.prefs = prefs.prefs;
			}
			else {
				$scope.prefs["hide"] = "overlay";
				storeOptions();
				console.log("Something went wrong with getting preferences from storage");
			}
			$scope.$apply();
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
	$scope.storeOptions = storeOptions;

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

	function updateChromeStorage() {
		chrome.storage.sync.set({"allTags": $scope.allTags});
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

		if (active) {
			delete $scope.active[title];
			$scope.numActive--;
		} else {
			delete $scope.inactive[title];
			$scope.numInactive--;
		}

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
		if ($scope.allTags[title].active) {
			delete $scope.active[title];
			$scope.numActive--;
		} else {
			delete $scope.inactive[title];
			$scope.numInactive--;
		}

		delete $scope.allTags[title];
		delete $scope.tagOptions[title];
		updateChromeStorage();
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
		updateChromeStorage();
	}

	function toggleSeeMoreActive() {
		$scope.seeMoreActive = !$scope.seeMoreActive;
	}

	function toggleSeeMoreInactive() {
		$scope.seeMoreInactive = !$scope.seeMoreInactive;
	}

	function storeOptions() {
		chrome.storage.sync.set({prefs: $scope.prefs});
	}
})

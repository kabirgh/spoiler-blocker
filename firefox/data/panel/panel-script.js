var app = angular.module('panelApp', [])

var allTags, prefs;
self.port.emit("get-spoilers", true);
self.port.emit("get-prefs", true);


app.controller('panelController', function($scope) {
	$scope.titleString = "";
	$scope.tagString = "";

	$scope.allTags = {};

	// tagOptions : {
	//               title: {
	//                 display: true|false,
	//                 editing: true|false
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


	self.port.on("sending-spoilers", function(obj) {
		$scope.$apply( function() {
			// chrome-relevant code. ff guarantees obj exists due to actions performed in index.js
			if (!obj) {
				console.log("allTags object does not exist. Initializing empty object");
				$scope.allTags = {};
				updateAllTags();
			}
			else {
				$scope.allTags = obj;
			}

			for (var title in $scope.allTags) {
				if (!$scope.allTags.hasOwnProperty(title)) {
					continue;
				}

				if ($scope.allTags[title].active) {
					$scope.active[title] = $scope.allTags[title];
					$scope.numActive++;
				} 
				else {
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

	self.port.on("sending-prefs", function(obj) {
		$scope.$apply( function() {
			// chrome-relevant code. ff guarantees obj exists due to actions performed in index.js
			if (!obj) {
				console.log("prefs object does not exist. Initializing empty object");
				$scope.prefs = {"hide": "overlay"};
			}
			else {
				$scope.prefs = obj;
			}
		});
	});


	$scope.getInput = getInput;
	$scope.editList = editList;
	$scope.editListSubmit = editListSubmit;
	$scope.editListCancel = editListCancel;
	$scope.deleteList = deleteList;
	$scope.toggleActivate = toggleActivate;
	$scope.toggleSeeMoreActive = toggleSeeMoreActive;
	$scope.toggleSeeMoreInactive = toggleSeeMoreInactive;

	function getInput() {
		processInput($scope.titleString, $scope.tagString, true);
		$scope.titleString = "";
		$scope.tagString = "";

		// Update the lists in storage
		updateAllTags();

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

		if ($scope.allTags[title]) {
			alert("A list with this name already exists. Please enter a new title");
			return;
		}

		$scope.allTags[title] = {
			"tags": tagArr,
			"active": active
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

	
	// Send updated allTags obj to index.js for persistent storage
	function updateAllTags() {
		self.port.emit("update-all-tags", $scope.allTags);
	}

	function editList(title) {
		var options = $scope.tagOptions[title];
		options.newTitle = title;
		options.newTags = $scope.allTags[title]["tags"].join(', ');
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
		updateAllTags();
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
		updateAllTags();
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
		updateAllTags();
	}

	function toggleSeeMoreActive() {
		$scope.seeMoreActive = !$scope.seeMoreActive;
	}

	function toggleSeeMoreInactive() {
		$scope.seeMoreInactive = !$scope.seeMoreInactive;
	}

	function updatePrefs() {
		// TODO
		chrome.storage.sync.set({prefs: $scope.prefs});
	}
})

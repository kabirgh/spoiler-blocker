import $ from "jquery";

export default 
	{
		pollForElem: pollForElem,
		filterElems: filterElems,
		getClosestAncestors: getClosestAncestors
	};

// TODO: change implementation to setTimeout?
function pollForElem(jquerySelector, interval, timeout, callback, callbackArgs=[]) {
	// check for elem immediately
	if (!pollForElemHelper(jquerySelector, callback, callbackArgs)) {
		// ms since function was first called
		let count = interval;
		let isElemFound = false;

		const elemChecker = setInterval( function() {
			isElemFound = pollForElemHelper(jquerySelector, callback, callbackArgs);

			if (isElemFound || count >= timeout) {
				clearInterval(elemChecker);
			}
		},
		interval);
	}
}

function pollForElemHelper(jquerySelector, callback, callbackArgs) {
	const $elem = $(jquerySelector);

	if ($elem.length !== 0) {
		callback($elem, ...callbackArgs);
		return true;
	}
	else {
		return false;
	}
}

// Returns an array of jquery objects corresponding to fb posts
function filterElems(elemList, jquerySelector) {
	let $elemsToReturn = [];

	for (let i=0; i<elemList.length; i++) {
		const $filteredList = $(elemList[i]).find(jquerySelector);

		$filteredList.each( function(index, domNode) {
			const $jqueryNode = $(domNode);

			// If the element is not nested
			if ($jqueryNode.parent().closest(jquerySelector).length === 0) {
				$elemsToReturn.push($jqueryNode);
			}
		});	
	}

	return $elemsToReturn;
}


function getClosestAncestors(elemList, selector) {
	let $parents = [];
	
	elemList.map( function($elem) {
		$parents.push($elem.closest(selector));
	});

	return $parents;
}

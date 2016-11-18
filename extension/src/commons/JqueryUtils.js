import $ from "jquery";

export default 
	{
		pollForElem: pollForElem,
		filterElems: filterElems,
		getClosestAncestors: getClosestAncestors
	};


function pollForElem(jquerySelector, interval, timeout, callback, callbackArgs=[]) {
	// ms since function was first called
	var count = interval;

	var elemChecker = setInterval( function() {
		var $elem = $(jquerySelector);

		if ($elem.length !== 0) {
			callback($elem, ...callbackArgs);
			clearInterval(elemChecker);
		}
		else {
			count += interval;
		}

		if (count == timeout) {
			clearInterval(elemChecker);
		}
	},
	interval);
}

// Returns an array of jquery objects corresponding to fb posts
function filterElems(elemList, jquerySelector) {
	var $elemsToReturn = [];

	for (let i=0; i<elemList.length; i++) {
		var $filteredList = $(elemList[i]).find(jquerySelector);

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

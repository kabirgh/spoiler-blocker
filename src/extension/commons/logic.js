import $ from "jquery";
import JqueryUtils from "./utils/JqueryUtils";
import CommonUtils from "./utils/CommonUtils";
import DOMObserver from "./DOMObserver";

// TODO: refactor into modules to follow separation of concerns

let _spoilersArr;
let _siteConfig;
/* 1. When body class changes, pollFeed is called with a timeout of 200ms.
 * 2. When pollFeed finds feed node, observeFeed is called.
 * 3. When observeFeed observes nodes added to feed,
 *   i.  hideInitialContent is called to hide posts/tweets present on page load.
 *   ii. optionallyHideContent is called on nodes added to the feed in the future.
 */
export default function hideContent(spoilersArr, siteConfig) {
	_spoilersArr = spoilersArr;
	_siteConfig = siteConfig;

	console.log("config");
	console.log(siteConfig);

	console.log("START");

	pollFeed();
	observeBodyClass();
}

function observeBodyClass() {
	const bodyNode = $("body")[0];
	const bodyObserver = new DOMObserver(bodyNode);

	// Observe class attribute of <body>. When it changes, call pollFeed
	bodyObserver.notifyAttributeChange(["class"], pollFeed);
}

function pollFeed() {
	const feedSelector = _siteConfig["feedSelector"];
	JqueryUtils.pollForElem(feedSelector, 100, 5000, observeFeed);
}

function observeFeed($feed) {
	console.log("Feed element on next line");
	console.log($feed[0]);

	hideInitialContent();

	const feedObserver = new DOMObserver($feed[0]);
	const queries = [{element: _siteConfig["elementQuery"]}];
	feedObserver.observeAddedNodes(queries, optionallyHideContent);
}

function hideInitialContent() {
	// Hide posts on initial load
	const $initialContent = getInitialContent();

	console.log("$initialContent on next line");
	console.log($initialContent);

	optionallyHideContent($initialContent);
}

function getInitialContent() {
	let jqueryArr = [], arr = [];
	_siteConfig["initialContentSelectors"].map( selector => jqueryArr.push($(selector)) );

	for (let i=0; i<jqueryArr.length; i++) {
		// Jquery objects may contain array of DOM nodes.
		// Convert to array of jquery objects containing a single node
		jqueryArr[i].each( function() {
			arr.push( $(this) );
		});
	}
	return arr;
}

// list is either array or NodeList
function optionallyHideContent(list) {
	const $contentArr = optionallyFilterContent(list);
	const $contentContainerArr = optionallyGetContentContainers($contentArr);

	let contentText;

	for (let i=0; i<$contentContainerArr.length; i++) {
		console.log("$content on next line");
		console.log($contentContainerArr[i]);

		contentText = getText($contentContainerArr[i]);
		console.log("Content text: " + contentText);

		CommonUtils.hideContent($contentContainerArr[i], contentText, _spoilersArr, _siteConfig);
	}
}

function optionallyFilterContent(list) {
	console.log("list on next line");
	console.log(list);

	const contentSelector = _siteConfig["newContentSelector"];

	let $contentArr = [];
	if (contentSelector !== null) {
		$contentArr = JqueryUtils.filterElems(list, contentSelector);
	}
	else {
		// Method suitable for iterating over arrays or NodeLists
		for (let i=0; i<list.length; i++) {
			$contentArr.push($(list[i]));
		}
	}

	return $contentArr;
}

function optionallyGetContentContainers($contentArr) {
	console.log("$contentArr on next line");
	console.log($contentArr);

	const containerSelector = _siteConfig["containerSelector"];

	let $contentContainerArr = [];
	if (containerSelector !== null) {
		$contentContainerArr = JqueryUtils.getClosestAncestors($contentArr, containerSelector);
	}
	else {
		$contentContainerArr = $contentArr;
	}

	console.log("$contentContainerArr on next line");
	console.log($contentContainerArr);

	return $contentContainerArr;
}

function getText($elem) {
	let text;
	const textSelector = _siteConfig["textSelector"];

	if (textSelector !== null) {
		text = $elem.find(textSelector).text();
	}
	else {
		text = $elem.text();
	}

	return text;
}

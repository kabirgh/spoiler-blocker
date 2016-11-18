import $ from "jquery";
import JqueryUtils from "../commons/JqueryUtils";
import CommonUtils from "../commons/CommonUtils";
import DOMObserver from "../commons/DOMObserver";


let globalSpoilersObj;
/* 1. When body class changes, pollFeed is called with a timeout of 200ms.
 * 2. When pollFeed finds feed node, observeFeedStream is called.
 * 3. When observeFeedStream observes nodes added to feed, 
 *   i.  hideInitialPosts is called to hide fb posts present on page load. 
 *    ii. optionallyHidePosts is called on nodes added to the feed.
 */
export default function hideFacebookPosts(spoilersObj) {
	globalSpoilersObj = spoilersObj;

	console.log("START");

	observeBodyClass();
	pollFeed();
}

function observeBodyClass() {
	const bodyNode = $("body")[0];
	const bodyObserver = new DOMObserver(bodyNode);

	// Observe class attribute of <body>. When it changes, call pollFeed
	bodyObserver.notifyAttributeChange(["class"], pollFeed);
}

function pollFeed() {
	const feedSelector = "div[id^='feed_stream']";
	JqueryUtils.pollForElem(feedSelector, 200, 5000, observeFeedStream);
}

function observeFeedStream($feed) {
	console.log("Feed element on next line");
	console.log($feed[0]);
	
	hideInitialPosts();

	const feedObserver = new DOMObserver($feed[0]);
	const queries = [{element: "div"}];
	feedObserver.observeAddedNodes(queries, optionallyHidePosts);
}

function hideInitialPosts() {
	// Hide posts on initial load
	const $initialPosts = [$("div[id='substream_0']"), $("div[id='substream_1']")];

	console.log("$initialPosts on next line");
	console.log($initialPosts);

	optionallyHidePosts($initialPosts);
}

function optionallyHidePosts(elemList) {
	const postContentSelector = "[class^='userContentWrapper']";
	const $posts = JqueryUtils.filterElems(elemList, postContentSelector);

	const containerSelector = "[id^='hyperfeed_story']";
	const $postContainers = JqueryUtils.getClosestAncestors($posts, containerSelector);

	$postContainers.forEach( function($post) {
		console.log("$post on next line");
		console.log($post);

		CommonUtils.hidePost($post, globalSpoilersObj);
	});
}

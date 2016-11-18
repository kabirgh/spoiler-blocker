import $ from "jquery";

module.exports = { hidePost: hidePost};

function hidePost($post, spoilersObj) {
	const activeSpoilers = removeInactiveLists(spoilersObj);

	const postText = $post.text();
	console.log("Post text: " + postText);

	let listHidePref;

	for (let title in activeSpoilers) {
		listHidePref = activeSpoilers[title]["hidePref"];

		let textAndTags = optionallyLowercaseTextAndTags(postText, activeSpoilers, title);

		for (let i=0; i<textAndTags["tags"].length; i++) {
			let tag = textAndTags["tags"][i];

			// If text contains tag
			if (textAndTags["text"].indexOf(tag) > -1) {
				if (listHidePref === "remove") {
					$post.remove();
				}
				else if (listHidePref === "overlay") {
					overlay($post, title);
				}
				else {
					console.log("Error in loading hide preference. Found " +
						listHidePref + " instead of 'overlay' or 'remove'. Defaulting to overlay");

					overlay($post, title);
				}
				break;
			}
		}
	}
}

function removeInactiveLists(spoilersObj) {
	let activeSpoilers = {};

	for (let title in spoilersObj) {
		if (spoilersObj[title]["isActive"]) {
			activeSpoilers[title] = spoilersObj[title];
		}
	}

	return activeSpoilers;
}

function optionallyLowercaseTextAndTags(postText, spoilersObj, title) {
	let tags = spoilersObj[title]["tags"]; 
	let text = postText;

	if (!spoilersObj[title]["isCaseSensitive"]) {
		tags = tags.map(tag => tag.toLowerCase());
		text = text.toLowerCase();
	}

	return {
		tags: tags,
		text: text
	};
}

// Adds a translucent opaque div on top of a given elem
function overlay($elem, listTitle) {
	// Add overlay only once
	if ($elem.children().hasClass("spoiler-overlay") === true) {
		return;
	}

	let $newDiv = $(document.createElement("div")).css({
		'position': 'absolute',
		'top': 0,
		'left': 0,
		'background-color': 'white',
		'opacity': 0.99,
		'display': 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		'text-align': 'center',
		'width': '100%',
		'height': '100%',
		'z-index': 99, // arbitrary large z-index to place overlay on top
		'cursor': 'pointer',
		'font-size': 30,
		'font-family': 'Eczar',
		'color': 'black'
	});

	$newDiv.html("This post may contain spoilers for <br>" + listTitle);

	$newDiv.addClass("spoiler-overlay");

	// Absolutely positioned element needs a relatively positioned ancestor
	$elem.css({
		'position': 'relative'
	});

	$newDiv.click( function() {
		$newDiv.hide();
	});

	$elem.append($newDiv);
}
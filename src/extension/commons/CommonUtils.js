import $ from "jquery";

module.exports = { hidePost: hidePost};

function hidePost($post, spoilersArr) {
	const activeSpoilers = spoilersArr.filter(obj => obj["isActive"]);

	const postText = $post.text();
	console.log("Post text: " + postText);

	let listHidePref, text; // strings
	let tags; // array of strings
	let spoilerObj; // object

	for (let i=0; i<activeSpoilers.length; i++) {
		spoilerObj = activeSpoilers[i];

		text = postText;
		tags = spoilerObj["tags"];
		if (!spoilerObj["isCaseSensitive"]) {
			text = text.toLowerCase();
			tags = tags.map(tag => tag.toLowerCase());
		}

		// TODO: extract method
		for (let j=0; j<tags.length; j++) {
			// If text contains tag
			if (text.indexOf(tags[j]) > -1) {
				if (listHidePref === "remove") {
					$post.remove();
				}
				else if (listHidePref === "overlay") {
					overlay($post, spoilerObj["title"]);
				}
				else {
					console.log("Error in loading hide preference. Found " +
						listHidePref + " instead of 'overlay' or 'remove'. Defaulting to overlay");

					overlay($post, spoilerObj["title"]);
				}
				break;
			}
		}
	}
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
// Hides posts by overlaying or removing them, if text contains a case-sensitive keyword
// listed in the global spoilers object (only active lists)
function hidePosts(domElem) {
	var $elem = $(domElem);

	if ($elem.length === 0) return;

	// Get all text from the post, including author, comments and content
	var postText = $elem.text();
	console.log(postText);

	for (var title in spoilersObj) {
		if (!spoilersObj.hasOwnProperty(title) || !spoilersObj[title]["active"]) {
			// Not actually a list or list is inactive
			continue;
		}

		// Check case-sensitivity option for this list. If false (insensitive),
		// convert both tag and tweet text to lower case before indexOf
		var caseSens = spoilersObj[title]["case-sensitive"];
		if (caseSens === false) {
			postText = postText.toLowerCase();
		}

		// Overlay or remove post
		var hidePref = spoilersObj[title]["hide-pref"];

		for (var j=0; j<spoilersObj[title]["tags"].length; j++) {

			var tag = spoilersObj[title]["tags"][j];
			if (caseSens === false) {
				tag = tag.toLowerCase();
			}

			// if post text contains a spoiler
			if (postText.indexOf(tag) > -1) {
				// hide post
				if (hidePref === "remove") {
					$($elem).remove();
				}
				else if (hidePref === "overlay") {
					overlay($elem, title);
				}
				else {
					console.log("Error in loading hide preference. Found " +
						hidePref + " instead of 'overlay' or 'remove'. Defaulting to overlay");
					overlay($elem, title);
				}
				break;
			}
		}
	}
}


// Adds a white, 97.5% opaque div on top of a given elem
function overlay($elem, listTitle) {
	// Add overlay only once
	if ($elem.children().hasClass("spoiler-overlay") === true) {
		return;
	}

	var hgt = '100%';

	var $newDiv = $(document.createElement("div")).css({
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
		'height': hgt,
		'z-index': 7,
		'cursor': 'pointer',
		'font-size': 30,
		'font-family': 'Eczar',
		'color': 'black'
	});

	$newDiv.html('Spoiler!<br><br>Title: ' + listTitle);

	$newDiv.addClass("spoiler-overlay");

	// Absolutely positioned element needs a relatively positioned ancestor
	$elem.css({
		'position': 'relative'
	});

	$newDiv.click( function() {
		$(this).hide()
	});

	$elem.append($newDiv);
}
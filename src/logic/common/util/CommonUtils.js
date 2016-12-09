import $ from "jquery";

module.exports = { hideContent: hideContent};

function hideContent($content, contentText, spoilersArr, siteConfig) {
	// Ignore tweets that have been hidden by adblock
	if ($content.height() <= 2) return;

	const activeSpoilers = spoilersArr.filter(obj => obj["isActive"]);

	let listHidePref, text; // strings
	let tagArr;
	let spoilerObj;

	for (let i=0; i<activeSpoilers.length; i++) {
		spoilerObj = activeSpoilers[i];

		console.log("spoilerObj on next line");
		console.log(spoilerObj);

		text = contentText;
		tagArr = spoilerObj["tags"];
		if (!spoilerObj["isCaseSensitive"]) {
			text = text.toLowerCase();
			tagArr = tagArr.map(tag => tag.toLowerCase());
		}

		listHidePref = spoilerObj["hidePref"];

		// TODO: extract method
		for (let j=0; j<tagArr.length; j++) {
			// If text contains tag
			if (text.indexOf(tagArr[j]) > -1) {
				if (listHidePref === "remove") {
					$content.remove();
				}
				else if (listHidePref === "overlay") {
					overlay($content, spoilerObj["title"], siteConfig["overlayHeight"]);
				}
				else {
					console.log("Error in loading hide preference. Found " +
						listHidePref + " instead of 'overlay' or 'remove'. Defaulting to overlay");

					overlay($content, spoilerObj["title"], siteConfig["overlayHeight"]);
				}
				break;
			}
		}
	}
}

// Adds a translucent opaque div on top of a given elem
function overlay($elem, listTitle, overlayHeight) {
	// Add overlay only once
	if ($elem.children().hasClass("spoiler-overlay") === true) {
		return;
	}

	let $newDiv = $(document.createElement("div")).css({
		"position": "absolute",
		"top": 0,
		"left": 0,
		"background-color": "white",
		"opacity": 0.99,
		"display": "flex",
		"justify-content": "center",
		"align-items": "center",
		"text-align": "center",
		"width": "100%",
		"height": overlayHeight,
		"z-index": 99, // arbitrary large z-index to place overlay on top
		"cursor": "pointer",
		"font-size": 30,
		"font-family": "Eczar",
		"color": "black"
	});

	$newDiv.html("This content may contain spoilers for <br><br>" + listTitle);

	$newDiv.addClass("spoiler-overlay");

	// Absolutely positioned element needs a relatively positioned ancestor
	$elem.css({
		"position": "relative"
	});

	$newDiv.click( function() {
		$newDiv.hide();
	});

	$elem.append($newDiv);
}

import $ from "jquery";

module.exports = { hideContent: hideContent};

function hideContent($content, contentText, spoilersArr, siteConfig) {
	// Ignore tweets that have been hidden by adblock
	if ($content.height() <= 2) return;

	const activeSpoilers = spoilersArr.filter(obj => obj["isActive"]);

	let listHidePref, text; // strings
	let tokenArr;
	let spoilerObj;

	for (let i=0; i<activeSpoilers.length; i++) {
		spoilerObj = activeSpoilers[i];

		console.log("spoilerObj on next line");
		console.log(spoilerObj);

		text = contentText;
		// Examine postfix token array
		tokenArr = spoilerObj["tokenArr"];
		if (!spoilerObj["isCaseSensitive"]) {
			text = text.toLowerCase();
			
			for (let idx=0; idx<tokenArr.length; idx++) {
				if (tokenArr[idx]["tokenType"] === "LITERAL") {
					tokenArr[idx]["value"] = tokenArr[idx]["value"].toLowerCase();
				}
			}
		}

		listHidePref = spoilerObj["hidePref"];

		// TODO: extract method
		for (let j=0; j<tokenArr.length; j++) {
			// If text contains tag
			if (evaluateTokenArr(text, tokenArr)) {
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

function evaluateTokenArr(text, arr) {
	console.log("TOKEN ARR: " + JSON.stringify(arr));
 
	let stack = [];
	let bool1, bool2;

	for (let i=0; i<arr.length; i++) {
		
		if (arr[i]["tokenType"] === "LITERAL") {
			stack.push(text.indexOf(arr[i]["value"]) !== -1);
		}
		else {
			bool1 = stack.pop();
			bool2 = stack.pop();

			if (arr[i]["value"] === "AND") {
				stack.push(bool1 && bool2);
			}
			else if (arr[i]["value"] === "OR") {
				stack.push(bool1 || bool2);
			}
			else {
				throw new Error("Internal error: BINARY_OP does not have value AND or OR");
			}
		}

	}

	return stack.pop();
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

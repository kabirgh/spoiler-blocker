// "./filename" is a shortcut for 
// require("sdk/self").data.url("filename")

// Access user preferences
var prefs = require("sdk/simple-prefs").prefs


// Store data across sessions
var ss = require("sdk/simple-storage").storage;
if (!ss.allTags) {

	ss.allTags = 
	{
		"spoiler-list-name":
		{
			"active": true, 
			"tags": ["tag1", "tag2"]
		},
		"another-name":
		{
			"active": false, 
			"tags": ["arr2", "abb"]
		}
	};

}


// Run content scripts when user is browsing facebook
var fbPageMod = require("sdk/page-mod");
fbPageMod.PageMod({
	include: "*.facebook.com",
	contentScriptWhen: "ready",
	contentScriptFile: ["./jquery.js", "./mutation-summary.js", "./fb.js"],
	onAttach: function(worker) {
		worker.port.emit("spoilers", ss.allTags);
		worker.port.emit("prefs", prefs);
	}
});

// Twitter scripts
var twitterPageMod = require("sdk/page-mod");
twitterPageMod.PageMod({
	include: "*.twitter.com",
	contentScriptWhen: "ready",
	contentScriptFile: ["./jquery.js", "./mutation-summary.js", "./twitter.js"],
	onAttach: function(worker) {
		worker.port.emit("spoilers", ss.allTags);
		worker.port.emit("prefs", prefs);
	}
});


// Create a button on the toolbar
var { ToggleButton } = require("sdk/ui/button/toggle");
var button = ToggleButton({
	id: "sb-button",
	label: "Spoiler Blocker",
	icon: {
		"16": "./img/icon-16.png",
		"32": "./img/icon-32.png",
		"64": "./img/icon-64.png"
	},
	onChange: handleButtonChange,
});

function handleButtonChange(state) {
	if (state.checked) {
		panel.show({
			position: button
		});
	}
}


// Attach a panel to the button
var panel = require("sdk/panel").Panel({
	contentURL: "./panel/panel.html",
	contentScriptFile: "./panel/panel-script.js",
	contentStyleFile: "./panel/panel-style.css",
	onHide: handlePanelHide
});

function handlePanelHide() {
	button.state('window', {checked: false});
}

// When requested, send all tags to the panel for display
panel.port.on("get-spoilers", function() {
	panel.port.emit("sending-spoilers", ss.allTags);
});

// Listen to messages from panel-script.js with tag "new-list" and store them 
// in the persistent allTags object. See ss initialisation for object structure.
panel.port.on("new-list", function(tagObj) {
	if (ss.allTags[tagObj["title"]]) {
		alert("A list with this title already exists.");
	}
	else {
		ss.allTags[tagObj["title"]] = {"active":true, "tags":tagObj["tags"]};
	}
});
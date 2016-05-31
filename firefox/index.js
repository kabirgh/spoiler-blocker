// "./filename" is a shortcut for 
// require("sdk/self").data.url("filename")

// Run content script when user is browsing facebook
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
	include: "*.facebook.com",
	contentScriptWhen: "ready",
	contentScriptFile: ["./jquery.js", "./fb.js"]
});


// Store data across sessions
var ss = require("sdk/simple-storage").storage;
if (!ss.tagArrs) {
	ss.tagArrs = {};
}


// Create a button on the toolbar
var { ToggleButton } = require("sdk/ui/button/toggle");
var button = ToggleButton({
	id: "sb-button",
	label: "Spoiler Blocker",
	icon: {
		"16": "./icon-16.png",
	    "32": "./icon-32.png",
	    "64": "./icon-64.png"
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
	contentURL: "./panel.html",
	contentScriptFile: "./panel-script.js",
	contentStyleFile: "./panel-style.css",
	onHide: handlePanelHide
});

function handlePanelHide() {
  button.state('window', {checked: false});
}

// Listen to messages from panel-script.js with tag "new-list" and store them 
// in the persisten tagArrs object. Key:value is title:array.
panel.port.on("new-list", function(tagObj) {
	if (ss.tagArrs[tagObj["title"]]) {
		alert("A list with this title already exists.");
	}
	else {
		ss.tagArrs[tagObj["title"]] = tagObj["tags"];
	}
});
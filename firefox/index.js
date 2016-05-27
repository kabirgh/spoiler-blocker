// "./filename" is a shortcut for 
// require("sdk/self").data.url("filename")

// Run content script when user is browsing facebook
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
	include: "*.facebook.com",
	contentScriptWhen: "ready",
	contentScriptFile: ["./jquery.js", "./fb.js"]
});

// Attach a panel to a button on the toolbar
var { ToggleButton } = require("sdk/ui/button/toggle");
var button = ToggleButton({
	id: "sb-button",
	label: "Spoiler Blocker",
	icon: {
		"16": "./icon-16.png",
	    "32": "./icon-32.png",
	    "64": "./icon-64.png"
  	},
  onChange: handleChange
});

var panel = require("sdk/panel").Panel({
	contentURL: "./panel.html",
	onHide: handleHide
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}
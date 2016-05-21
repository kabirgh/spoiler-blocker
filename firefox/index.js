var self = require("sdk/self");
var pageMod = require("sdk/page-mod");

var tag = "userContentWrapper";

pageMod.PageMod({
	include: "*.facebook.com",
	contentScriptWhen: "ready",
	contentScriptFile: [self.data.url("jquery.js"), self.data.url("arrive.js"), self.data.url("fb.js")]
});


const fbConfig = {
	feedSelector: "div[id^='feed_stream']",
	elementQuery: "div",
	initialContentSelectors: ["#substream_0", "#substream_1"],
	newContentSelector: "[class^='userContentWrapper']",
	containerSelector: "[id^='hyperfeed_story']",
	textSelector: null
};

// TODO: cleaner way to export?
export {fbConfig as fbConfig};
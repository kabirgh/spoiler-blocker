var regExp = /hyperfeed_story_id*/g;
var arr = ["GoT", "Game of Thrones"];

$(document).ready(function() {
	start();
});

function start() {
	for (var i=0; i<arr.length; i++) {
		$("p[name*='" + arr[i] + "']").append("div id='spoiler_overlay'></div>");
	}

	$("#spoiler_overlay")
	.css({
		'opacity' : 0.4,
		'position': 'absolute',
		'top': 0,
		'left': 0,
		'background-color': 'white',
		'width': '100%',
		'z-index': 5000
	});
}
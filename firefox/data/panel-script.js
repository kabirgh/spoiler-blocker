var tags = ["the", "a"];

console.log("panelscript")

var titleButton = document.getElementById("title-button");
titleButton.onclick = function() {
    var title = document.getElementById("title-input")
    			.value.replace(/(\r\n|\n|\r)/gm,"");

    console.log(title);

    self.port.emit("new-list", {"title": title, "tags": tags});
    titleButton.value = '';
}
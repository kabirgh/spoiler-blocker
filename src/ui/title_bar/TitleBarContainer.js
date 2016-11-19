import React from "react";
import TitleBar from"./TitleBar";
import titleBarActions from "./titleBarActions";

class TitleBarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
	}

	handleAddButtonPress(event) {
		console.log("title bar add event on next line");
		console.log(event);
		console.log(titleBarActions);
		titleBarActions.showAddCard();
	}

	render() {
		return <TitleBar 
			onAddButtonPress={this.handleAddButtonPress}
		/>;
	}
}

export default TitleBarContainer;
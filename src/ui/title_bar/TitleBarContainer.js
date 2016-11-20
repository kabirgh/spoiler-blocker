import React from "react";
import TitleBar from"./TitleBar";
import titleBarActions from "./titleBarActions";

class TitleBarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
	}

	handleAddButtonPress(event) {
		titleBarActions.showAddCard();
	}

	render() {
		return <TitleBar 
			onAddButtonPress={this.handleAddButtonPress}
		/>;
	}
}

export default TitleBarContainer;
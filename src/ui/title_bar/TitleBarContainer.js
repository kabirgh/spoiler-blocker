import React from "react";
import TitleBar from"./TitleBar";
import titleBarActions from "./titleBarActions";

class TitleBarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddList = this.handleAddList.bind(this);
	}

	handleAddList() {
		titleBarActions.showAddCard();
	}

	render() {
		return <TitleBar 
			onAddList={this.handleAddList}
		/>;
	}
}

export default TitleBarContainer;
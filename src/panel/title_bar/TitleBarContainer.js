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

	handleOptions() {
		titleBarActions.openOptionsPage();
	}

	render() {
		return <TitleBar 
			onAddList={this.handleAddList}
			onOptions={this.handleOptions}
		/>;
	}
}

export default TitleBarContainer;
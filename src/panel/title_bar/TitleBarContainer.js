import React from "react";
import TitleBar from"./TitleBar";
import titleBarActions from "./titleBarActions";

class TitleBarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddList = this.handleAddList.bind(this);
		this.handleDownloadList = this.handleDownloadList.bind(this);
		
	}

	handleAddList() {
		titleBarActions.showAddCard();
	}

	handleOptions() {
		titleBarActions.openOptionsPage();
	}

	handleDownloadList() {
		titleBarActions.showDownloadCard();
	}

	render() {
		return <TitleBar
			onAddList={this.handleAddList}
			onOptions={this.handleOptions}
			onDownloadList={this.handleDownloadList}
		/>;
	}
}

export default TitleBarContainer;

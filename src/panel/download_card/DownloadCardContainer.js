import React from "react";
// const PropTypes = React.PropTypes; TODO
import {observer} from "mobx-react";
import {observable} from "mobx";
import MainStore from "../common/MainStore";
import downloadActions from "./downloadActions";
import commonActions from "../common/commonActions";
import DownloadCard from "./DownloadCard";
import {Collapse} from "@blueprintjs/core";

@observer
class DownloadCardContainer extends React.Component {
	@observable title = "";
	@observable id = "";

	constructor(props) {
		super(props);

		this.title = "";
		this.id = "";

		this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
		this.handleUpdateID = this.handleUpdateID.bind(this);
		this.handleDownload = this.handleDownload.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleUpdateTitle(event) {
		commonActions.resetToastObject();

		this.title = event.target.value;
	}

	handleUpdateID(event) {
		commonActions.resetToastObject();

		this.id = event.target.value;
	}

	handleDownload() {
		// Displays different toast messages on save success and fail. See downloadActions for details
		downloadActions.saveDownloadList(this.title, this.id);
	}

	handleClose() {
		this.title = "";
		this.id = "";
		downloadActions.hideDownloadCard();
	}

	render() {
		return (
			<Collapse isOpen={MainStore.isDownloadCardVisible}>
				<br />
				<DownloadCard
					onUpdateTitle={this.handleUpdateTitle}
					onUpdateID={this.handleUpdateID}
					onDownload={this.handleDownload}
					onClose={this.handleClose}
				/>
			</Collapse>
		);
	}
}

export default DownloadCardContainer;

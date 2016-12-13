import React from "react";
// const PropTypes = React.PropTypes; TODO
import {observer} from "mobx-react";
import MainStore from "../common/MainStore";
import downloadActions from "./downloadActions";
import DownloadCard from "./DownloadCard";
import {Collapse} from "@blueprintjs/core";

@observer
class DownloadCardContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			id: ""
		};

		this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
		this.handleUpdateID = this.handleUpdateID.bind(this);
		this.handleDownload = this.handleDownload.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleUpdateTitle(event) {
		downloadActions.resetToastFlags();

		this.setState({
			title: event.target.value
		});
	}

	handleUpdateID(event) {
		downloadActions.resetToastFlags();

		this.setState({
			id: event.target.value
		});
	}

	handleDownload() {
		// Displays different toast messages on save success and fail. See downloadActions for details
		downloadActions.saveDownloadList(this.state.title, this.state.id);
	}

	handleClose() {
		this.setState({
			title: "",
			id: ""
		});
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

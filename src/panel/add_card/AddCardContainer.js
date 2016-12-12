import React from "react";
// const PropTypes = React.PropTypes; TODO
import {observer} from "mobx-react";
import MainStore from "../common/MainStore";
import addActions from "./addActions";
import AddCard from "./AddCard";
import {Collapse} from "@blueprintjs/core";

@observer
class AddCardContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			tags: ""
		};

		this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
		this.handleUpdateTags = this.handleUpdateTags.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleUpdateTitle(event) {
		addActions.resetToastFlags();

		this.setState({
			title: event.target.value
		});
	}

	handleUpdateTags(event) {
		addActions.resetToastFlags();

		this.setState({
			tags: event.target.value
		});
	}

	handleSave() {
		// Displays different toast messages on save success and fail. See addActions for details
		addActions.saveAddList(this.state.title, this.state.tags);
	}

	handleClose() {
		this.setState({
			title: "",
			tags: ""
		});
		addActions.hideAddCard();
	}

	render() {
		return (
			<Collapse isOpen={MainStore.isAddCardVisible}>
				<br />
				<AddCard
					onUpdateTitle={this.handleUpdateTitle}
					onUpdateTags={this.handleUpdateTags}
					onSave={this.handleSave}
					onClose={this.handleClose}
				/>
			</Collapse>
		);
	}
}

export default AddCardContainer;

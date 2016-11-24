import React from "react";
// const PropTypes = React.PropTypes; TODO
import {observer} from "mobx-react";
import store from "../store";
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
		this.setState({
			title: event.target.value
		});
	}

	handleUpdateTags(event) {
		this.setState({
			tags: event.target.value
		});
	}

	handleSave() {
		console.log("handleSave");
		addActions.saveAddList(this.state.title, this.state.tags);
		addActions.hideAddCard();
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
			<Collapse isOpen={store.isAddCardVisible}>
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
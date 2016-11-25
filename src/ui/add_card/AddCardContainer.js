import React from "react";
// const PropTypes = React.PropTypes; TODO
import {observer} from "mobx-react";
import store from "../store";
import addActions from "./addActions";
import AddCard from "./AddCard";
import {Toaster, Position, Intent, Collapse} from "@blueprintjs/core";

@observer
class AddCardContainer extends React.Component {
	toaster = Toaster.create({
		className: "top-toaster",
		autoFocus: false,
		canEscapeKeyClear: true,
		position: Position.TOP,
	});

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
		addActions.saveAddList(this.state.title, this.state.tags);
		addActions.hideAddCard();

		// TODO: "Warning: _renderNewRootComponent(): Render methods should be a pure function 
		// of props and state; triggering nested component updates from render is not allowed. 
		// If necessary, trigger nested updates in componentDidUpdate."
		this.toaster.show({
			message: "New list added.",
			iconName: "tick",
			intent: Intent.SUCCESS,
			timeout: 2000
		});
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
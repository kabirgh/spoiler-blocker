import React from "react";
// const PropTypes = React.PropTypes; TODO
import AddCard from "./AddCard";
import {observer} from "mobx-react";
import store from "../store";
import addActions from "./addActions";

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
		this.handleSaveButtonPress = this.handleSaveButtonPress.bind(this);
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

	handleSaveButtonPress() {
		console.log("we at handleSaveButtonPress");
		addActions.saveAddList(this.state.title, this.state.tags);
	}

	render() {
		return (
			<div>
				{store.addListAction ? <br /> : <p />}
				<AddCard 
					visible={store.addListAction}
					onUpdateTitle={this.handleUpdateTitle}
					onUpdateTags={this.handleUpdateTags}
					onSaveButtonPress={this.handleSaveButtonPress}
				/>
				{store.addListAction ? <br /> : <p />}
			</div>
		);
	}
}

export default AddCardContainer;
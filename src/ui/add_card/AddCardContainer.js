import React from "react";
// const PropTypes = React.PropTypes; TODO
import AddCard from "./AddCard";
import {observer} from "mobx-react";
import store from "../store";
// import addActions from "./addActions";

@observer
class AddCardContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleSaveButtonPress = this.handleSaveButtonPress.bind(this);
	}

	handleSaveButtonPress(event) {
		console.log("add card save event on next line");
		console.log(event);
	}

	render() {
		return (
			<div>
				{store.addListAction ? <br /> : <p />}
				<AddCard 
					visible={store.addListAction} 
					onSaveButtonPress={this.handleSaveButtonPress}
				/>
				{store.addListAction ? <br /> : <p />}
			</div>
		);
	}
}

export default AddCardContainer;
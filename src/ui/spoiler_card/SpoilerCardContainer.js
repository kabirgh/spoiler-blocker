import React from "react";
const PropTypes = React.PropTypes;
import SpoilerCard from "./SpoilerCard";
import {observer} from "mobx-react";
import actions from "../actions";

// Handles logic for SpoilerCard component
@observer
class SpoilerCardContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tags: props.tags,
			index: props.index
		};

		this.handleUpdatedTags = this.handleUpdatedTags.bind(this);
		this.handleSaveButtonPress = this.handleSaveButtonPress.bind(this);
	}

	handleUpdatedTags(event) {
		this.setState({
			tags: event.target.value
		});
	}

	handleSaveButtonPress() {
		actions.editTags(this.props.index, this.props.title, this.state.tags);
	}

	render() {
		return (
			<SpoilerCard 
				title={this.props.title} 
				isActive={this.props.isActive}
				tags={this.state.tags}
				onUpdatedTags={this.handleUpdatedTags}
				onSaveButtonPress={this.handleSaveButtonPress}
			/>
		);
	}
}

SpoilerCardContainer.propTypes = {
	index: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	tags: PropTypes.string.isRequired
};

export default SpoilerCardContainer;
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
			isExpanded: false,
			tags: props.tags,
			index: props.index
		};

		this.handleUpdatedTags = this.handleUpdatedTags.bind(this);
		this.handleSaveButtonPress = this.handleSaveButtonPress.bind(this);
		this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
	}

	handleExpandCollapse() {
		this.setState({
			isExpanded: !this.state.isExpanded
		});
		console.log("new isExpanded: " + this.state.isExpanded);
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
				onExpandCollapse={this.handleExpandCollapse}
				isExpanded={this.state.isExpanded}
				title={this.props.title} 
				isActive={this.props.isActive}
				tags={this.state.tags}
				onUpdateTags={this.handleUpdatedTags}
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
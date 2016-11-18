import React from "react";
const PropTypes = React.PropTypes;
import SpoilerCard from "./SpoilerCard";

// Handles logic for SpoilerCard component
const SpoilerCardContainer = React.createClass({
	propTypes: {
		title: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired,
		keywords: PropTypes.string.isRequired
	},

	getInitialState() {
		return {
			keywords: this.props.keywords
		};
	},

	handleUpdateKeywords(event) {
		this.setState({
			keywords: event.target.value
		});
	},

	handleSaveButtonPress(event) {
	},

	render() {
		return (
			<SpoilerCard 
				title={this.props.title} 
				isActive={this.props.isActive}
				keywords={this.state.keywords}
				onUpdateKeywords={this.handleUpdateKeywords}
				onSaveButtonPress={this.handleSaveButtonPress}
			/>
		);
	}
});

export default SpoilerCardContainer;
import React from "react";
const PropTypes = React.PropTypes;
import SpoilerCard from "./SpoilerCard";
import actions from "../actions";

// Handles logic for SpoilerCard component
class SpoilerCardContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keywords: props.keywords,
			index: props.index
		};
		this.handleUpdateKeywords = this.handleUpdateKeywords.bind(this);
		this.handleSaveButtonPress = this.handleSaveButtonPress.bind(this);
	}

	handleUpdateKeywords(event) {
		this.setState({
			keywords: event.target.value
		});
	}

	handleSaveButtonPress() {
		actions.editList(this.props.index, this.props.title, this.state.keywords);
	}

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
}

SpoilerCardContainer.propTypes = {
	index: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	keywords: PropTypes.string.isRequired
};

export default SpoilerCardContainer;
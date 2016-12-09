import React from "react";
const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import {observable} from "mobx";
import spoilerCardActions from "./spoilerCardActions";
import SpoilerCard from "./SpoilerCard";

// TODO: editable title
// Handles logic for SpoilerCard component
@observer
class SpoilerCardContainer extends React.Component {
	@observable isExpanded = false;
	/* TODO: does 'tags' have to be observable? */
	@observable tags = null;

	constructor(props) {
		super(props);

		this.isExpanded = false;
		this.tags = props.tags;

		this.handleUpdateTags = this.handleUpdateTags.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
	}

	handleExpandCollapse() {
		this.isExpanded = !this.isExpanded;
	}

	handleUpdateTags(string) {
		this.tags = string;
	}

	handleSave() {
		spoilerCardActions.editTags(this.props.index, this.props.title, this.tags);
	}

	render() {
		return (
			<SpoilerCard
				index={this.props.index}
				onExpandCollapse={this.handleExpandCollapse}
				isExpanded={this.isExpanded}
				title={this.props.title}
				isActive={this.props.isActive}
				tags={this.tags}
				onUpdateTags={this.handleUpdateTags}
				onSave={this.handleSave}
				marginBottom={this.props.marginBottom}
			/>
		);
	}
}

SpoilerCardContainer.propTypes = {
	index: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	tags: PropTypes.string.isRequired,
	marginBottom: PropTypes.number.isRequired
};

export default SpoilerCardContainer;

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
	@observable title = null;
	/* TODO: does 'tags' have to be observable? */
	@observable tags = null;

	constructor(props) {
		super(props);

		this.isExpanded = false;
		this.title = props.title;
		this.tags = props.tags;
		this.oldTitle = props.title;

		this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
		this.handleUpdateTags = this.handleUpdateTags.bind(this);
		this.handleSaveTitle = this.handleSaveTitle.bind(this);
		this.handleSaveTags = this.handleSaveTags.bind(this);
		this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
	}

	handleExpandCollapse() {
		this.isExpanded = !this.isExpanded;
	}

	handleUpdateTitle(string) {
		this.title = string;
	}

	handleUpdateTags(string) {
		this.tags = string;
	}

	handleSaveTitle() {
		if (spoilerCardActions.isValidTitle(this.title)) {
			spoilerCardActions.editTitle(this.props.index, this.title, this.tags);
			this.oldTitle = this.title;
		} else {
			this.title = this.oldTitle;
		}
	}

	handleSaveTags() {
		spoilerCardActions.editTags(this.props.index, this.title, this.tags);
	}

	render() {
		return (
			<SpoilerCard
				index={this.props.index}
				onExpandCollapse={this.handleExpandCollapse}
				isExpanded={this.isExpanded}
				isActive={this.props.isActive}
				title={this.title}
				tags={this.tags}
				onUpdateTitle={this.handleUpdateTitle}
				onUpdateTags={this.handleUpdateTags}
				onSaveTitle={this.handleSaveTitle}
				onSaveTags={this.handleSaveTags}
				marginBottom={this.props.marginBottom}
			/>
		);
	}
}

SpoilerCardContainer.propTypes = {
	index: PropTypes.number.isRequired,
	isActive: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	tags: PropTypes.string.isRequired,
	marginBottom: PropTypes.number.isRequired
};

export default SpoilerCardContainer;

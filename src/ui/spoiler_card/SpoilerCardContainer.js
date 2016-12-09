import React from "react";
const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import {observable} from "mobx";
import spoilerCardActions from "./spoilerCardActions";
import SpoilerCard from "./SpoilerCard";

// Handles logic for SpoilerCard component
@observer
class SpoilerCardContainer extends React.Component {
	@observable isExpanded = false;
	@observable title = null;
	/* TODO: does 'tags' have to be observable? */
	@observable tags = null;
	@observable isBeingEdited = false;

	constructor(props) {
		super(props);

		this.isExpanded = false;
		this.title = props.title;
		this.tags = props.tags;
		this.oldTitle = props.title;
		this.isBeingEdited = false;

		this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
		this.handleUpdateTags = this.handleUpdateTags.bind(this);
		this.handleSaveTitle = this.handleSaveTitle.bind(this);
		this.handleSaveTags = this.handleSaveTags.bind(this);
		this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
		this.handleCancelTitleEdit = this.handleCancelTitleEdit.bind(this);
		this.handleEditingTitle = this.handleEditingTitle.bind(this);
	}

	handleExpandCollapse() {
		this.isExpanded = !this.isExpanded;
	}

	handleEditingTitle() {
		this.isBeingEdited = true;
	}

	handleUpdateTitle(string) {
		this.title = string;
	}

	handleUpdateTags(string) {
		this.tags = string;
	}

	handleCancelTitleEdit() {
		this.isBeingEdited = false;
	}

	handleSaveTitle() {
		if (spoilerCardActions.isValidTitle(this.title, this.props.index)) {
			spoilerCardActions.editTitle(this.props.index, this.title, this.tags);
			this.oldTitle = this.title;
		} else {
			this.title = this.oldTitle;
		}
		this.isBeingEdited = false;
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
				title={this.props.title}
				isActive={this.props.isActive}
				isBeingEdited={this.isBeingEdited}
				title={this.title}
				tags={this.tags}
				onEditTitle={this.handleEditingTitle}
				onUpdateTitle={this.handleUpdateTitle}
				onUpdateTags={this.handleUpdateTags}
				onCancelTitleEdit={this.handleCancelTitleEdit}
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

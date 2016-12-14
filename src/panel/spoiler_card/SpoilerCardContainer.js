import React from "react";
const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import {observable, action} from "mobx";
import spoilerCardActions from "./spoilerCardActions";
import SpoilerCard from "./SpoilerCard";

// Handles logic for SpoilerCard component
@observer
class SpoilerCardContainer extends React.Component {
	@observable title = null;
	@observable tags = null; /* TODO: does 'tags' have to be observable? */

	@observable isExpanded = false;
	@observable isBeingEdited = false;
	@observable shouldShowTagsTick = false;

	constructor(props) {
		super(props);

		this.title = props.title;
		this.oldTitle = props.title;
		this.tags = props.tags;

		this.isExpanded = false;
		this.isBeingEdited = false;
		this.shouldShowTagsTick = false;

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
		console.log("cancel title edit");
		this.isBeingEdited = false;
	}

	handleSaveTitle() {
		if (spoilerCardActions.isValidTitle(this.props.index, this.title)) {
			this.title = this.title.trim();
			spoilerCardActions.editTitle(this.props.index, this.title, this.tags);
			this.oldTitle = this.title;
		}
		else {
			this.title = this.oldTitle;
		}

		this.isBeingEdited = false;
	}

	handleSaveTags() {
		spoilerCardActions.editTags(this.props.index, this.title, this.tags);
		this.tags = this.tags.trim();

		// Show tick for 2 seconds as save confirmation
		this.shouldShowTagsTick = true;
		setTimeout( () => {
			this.shouldShowTagsTick = false;
		},
		2000);
	}

	render() {
		return (
			<SpoilerCard
				index={this.props.index}
				title={this.title}
				tags={this.tags}

				isActive={this.props.isActive}
				isExpanded={this.isExpanded}
				isBeingEdited={this.isBeingEdited}
				shouldShowTagsTick={this.shouldShowTagsTick}

				onExpandCollapse={this.handleExpandCollapse}
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

import React from "react";
const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import OptionsMenu from "./OptionsMenu";
import MainStore from "../common/MainStore";
import optionsMenuActions from "./optionsMenuActions";

@observer
class OptionsMenuContainer extends React.Component {
	constructor(props) {
		super(props);

		this.handleToggleActive = this.handleToggleActive.bind(this);
		this.handleToggleCaseSensitive = this.handleToggleCaseSensitive.bind(this);
		this.handleToggleHidePref = this.handleToggleHidePref.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleToggleActive() {
		optionsMenuActions.toggleActive(this.props.index);
	}

	handleToggleCaseSensitive() {
		optionsMenuActions.toggleCaseSensitive(this.props.index);
	}

	handleToggleHidePref() {
		optionsMenuActions.toggleHidePref(this.props.index);
	}

	handleDelete() {
		// Creates a toast. See optionsMenuActions and toast/Toast for details
		optionsMenuActions.deleteList(this.props.index);
	}

	render() {
		return (
			<OptionsMenu
				index={this.props.index}

				isActive={MainStore.spoilers[this.props.index]["isActive"]}
				onToggleActive={this.handleToggleActive}

				isCaseSensitive={MainStore.spoilers[this.props.index]["isCaseSensitive"]}
				onToggleCaseSensitive={this.handleToggleCaseSensitive}

				hidePref={MainStore.spoilers[this.props.index]["hidePref"]}
				onToggleHidePref={this.handleToggleHidePref}

				onDelete={this.handleDelete}
			/>
		);
	}
}

OptionsMenuContainer.propTypes = {
	index: PropTypes.number.isRequired
};

export default OptionsMenuContainer;

import React from "react";
const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import OptionsMenu from "./OptionsMenu";
import store from "../store";
import optionsMenuActions from "./optionsMenuActions";

@observer
class OptionsMenuContainer extends React.Component {
	constructor(props) {
		super(props);

		this.handleToggleCaseSensitivity = this.handleToggleCaseSensitivity.bind(this);
		this.handleToggleHidePref = this.handleToggleHidePref.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleToggleCaseSensitivity() {
		optionsMenuActions.toggleCaseSensitivity(this.props.index);
	}

	handleToggleHidePref() {
		optionsMenuActions.toggleHidePref(this.props.index);
	}

	handleDelete() {
		optionsMenuActions.deleteList(this.props.index);
	}

	render() {
		return (
			<OptionsMenu
				index={this.props.index}
				isCaseSensitive={store.spoilers[this.props.index]["isCaseSensitive"]}
				onToggleCaseSensitivity={this.handleToggleCaseSensitivity}
				hidePref={store.spoilers[this.props.index]["hidePref"]}
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
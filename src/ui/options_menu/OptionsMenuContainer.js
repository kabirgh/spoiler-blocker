import React from "react";
const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import optionsMenuActions from "./optionsMenuActions";
import OptionsMenu from "./OptionsMenu";
import store from "../store";

@observer
class OptionsMenuContainer extends React.Component {
	constructor(props) {
		super(props);

		this.handleToggleCaseSensitivity = this.handleToggleCaseSensitivity.bind(this);
	}

	handleToggleCaseSensitivity(event) {
		optionsMenuActions.toggleCaseSensitivity(this.props.index);
	}

	render() {
		return (
			<OptionsMenu
				index={this.props.index}
				isCaseSensitive={store.spoilers[this.props.index]["isCaseSensitive"]}
				onToggleCaseSensitivity={this.handleToggleCaseSensitivity}
			/>
		);
	}
}

OptionsMenuContainer.propTypes = {
	index: PropTypes.number.isRequired
};

export default OptionsMenuContainer;
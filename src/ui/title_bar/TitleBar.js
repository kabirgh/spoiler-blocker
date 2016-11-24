import React from "react";
const PropTypes = React.PropTypes;
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const TitleBar = props => (
	// TODO: remove bottom shadow
	<AppBar
		title="Title"
		showMenuIconButton={false}
		iconElementRight={
			<IconButton onTouchTap={props.onAddButtonPress}>
				<ContentAdd />
			</IconButton>
		}
	/>
);

TitleBar.propTypes = {
	onAddButtonPress: PropTypes.func.isRequired
};

export default TitleBar;
import React from "react";
const PropTypes = React.PropTypes;
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const TitleBar = props => (
	<AppBar
		title="Title"
		showMenuIconButton={false}
		iconElementRight={
			// <div onClick={props.onAddPressCallback}>
				<IconButton>
					<ContentAdd />
				</IconButton>
			// </div>
		}
	/>
);

// TitleBar.propTypes = {
// 	onAddPressCallback: PropTypes.func.isRequired
// };

export default TitleBar;
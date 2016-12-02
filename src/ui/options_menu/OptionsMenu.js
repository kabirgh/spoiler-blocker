import React from "react";
const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import {Menu, MenuItem, MenuDivider, Switch} from "@blueprintjs/core";

const OptionsMenu = observer(props => 
	<Menu>
		<div style={{paddingTop: 4, paddingLeft: 2}}>
			<Switch // TODO: should isActive control be here?
				label="Active"
				checked={props.isActive}
				onChange={props.onToggleActive}
			/>
			<Switch 
				label="Case sensitive"
				checked={props.isCaseSensitive}
				onChange={props.onToggleCaseSensitive}
			/>
			<Switch 
				label="Overlay/remove" // TODO: clearer label
				checked={props.hidePref === "remove"}
				onChange={props.onToggleHidePref}
			/>
			<MenuDivider />
			<MenuItem 
				iconName="trash"
				text="Delete"
				onClick={props.onDelete}
			/>
		</div>
	</Menu>
);

OptionsMenu.propTypes = {
	isActive: PropTypes.bool.isRequired,
	onToggleActive: PropTypes.func.isRequired,

	isCaseSensitive: PropTypes.bool.isRequired,
	onToggleCaseSensitive: PropTypes.func.isRequired,

	hidePref: PropTypes.string.isRequired,
	onToggleHidePref: PropTypes.func.isRequired,

	onDelete: PropTypes.func.isRequired
};

export default OptionsMenu;
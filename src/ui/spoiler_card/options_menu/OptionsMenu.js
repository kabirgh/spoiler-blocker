import React from "react";
import {Menu, MenuItem, MenuDivider, Switch} from "@blueprintjs/core";

const OptionsMenu = () => (
	<Menu>
		<Switch 
			checked={false}
			label="Case-sensitive"
			// onChange={this.onCaseSensitivityChange}
		/>
		<MenuItem
			iconName="new-object"
			// onClick={this.handleClick}
			text="New object" 
		/>
		<MenuItem
			iconName="new-link"
			// onClick={this.handleClick}
			text="New link"
		/>
		<MenuDivider />
		<MenuItem 
			iconName="trash"
			text="Delete" 
		/>
	</Menu>
);

export default OptionsMenu;
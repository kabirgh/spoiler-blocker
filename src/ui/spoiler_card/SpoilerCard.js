import React from "react";
const PropTypes = React.PropTypes;
import {Card, CardHeader, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import {observer} from "mobx-react";

import {Collapse} from "@blueprintjs/core";

const SpoilerCard = observer(props => 
	<div>
		<div className="pt-card" style={{position: "relative"}}>
			<div className="pt-navbar-group" style={{position: "absolute", top: 0, right: 0, paddingRight:10}}>
				<button className={"pt-button pt-minimal pt-icon-more"}></button>
				<button 
					className={"pt-button pt-minimal " + (props.isExpanded ? "pt-icon-chevron-down" : "pt-icon-chevron-right")}
					onClick={props.onExpandCollapse}></button>
			</div>
			<Collapse isOpen={props.isExpanded}>
				Dummy text.
			</Collapse>
		</div>
	
	</div>
);

SpoilerCard.propTypes = {
	onExpandCollapse: PropTypes.func.isRequired,
	isExpanded: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	tags: PropTypes.string.isRequired,
	onUpdateTags: PropTypes.func.isRequired,
	onSaveButtonPress: PropTypes.func.isRequired
};

export default SpoilerCard;
import React from "react";
const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import {EditableText, Collapse} from "@blueprintjs/core";

const SpoilerCard = observer(props => 
	<div>
		<div className="pt-card" style={{position: "relative"}}>
			{/* TODO: make editable */}
			<div>
				{props.title}
			</div>
			<div className="pt-navbar-group" style={{position: "absolute", top: 0, right: 0, paddingRight:10}}>
				<button className={"pt-button pt-minimal pt-icon-more"}></button>
				{props.isExpanded ? 
					<button 
					className="pt-button pt-minimal pt-icon-chevron-down"
					onClick={props.onExpandCollapse}></button>
					: 
					<button 
					className="pt-button pt-minimal pt-icon-chevron-right"
					onClick={props.onExpandCollapse}></button>
				}
			</div>
			<Collapse isOpen={props.isExpanded}>
				<br />
				<EditableText value={props.tags} onChange={props.onUpdateTags} onConfirm={props.onSave} />
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
	onSave: PropTypes.func.isRequired
};

export default SpoilerCard;
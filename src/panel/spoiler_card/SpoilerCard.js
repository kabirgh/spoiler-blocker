import React from "react";
const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import {Popover, Position, Button, EditableText, Collapse} from "@blueprintjs/core";
import OptionsMenuContainer from "../options_menu/OptionsMenuContainer";

// TODO: extract smaller components
const SpoilerCard = observer(props =>
	<div className="pt-card"
		style={{position: "relative",
				backgroundColor: "#F5F8FA",
				color: props.isActive ? "#000000" : "#5C7080",
				borderLeft: props.isActive ? "8px solid #29A634" : "8px solid #738694",
				marginBottom: props.marginBottom}}>

		<div style={{display: "flex", flexDirection: "row"}}>
			<EditableText
				value={props.title + ((props.isBeingEdited || props.isActive) ? "" : " (Inactive)")}
				onChange={props.onUpdateTitle}
				onConfirm={props.onSaveTitle}
				onEdit={props.onEditTitle}
				onCancel={props.onCancelTitleEdit}
			/>
			{props.shouldShowTitleTick ? <div className="pt-icon-tick" style={{color: "green"}} /> : "title tick false"}
		</div>

		<div className="pt-navbar-group" style={{position: "absolute", top: 0, right: 0, paddingRight: 10}}>

			<Popover
				content={
					<OptionsMenuContainer index={props.index} />
				}
				inline={true}
				position={Position.LEFT_TOP}
				onClick={props.onOptionsMenuClick}>

				<Button className={"pt-minimal pt-icon-more"} />

			</Popover>

			{props.isExpanded ?
				<Button className="pt-minimal pt-icon-chevron-down" onClick={props.onExpandCollapse} />
				:
				<Button className="pt-minimal pt-icon-chevron-right" onClick={props.onExpandCollapse} />
			}
		</div>
		<Collapse isOpen={props.isExpanded}>

			<br />
			<div style={{display: "flex", flexDirection: "row"}}>
				<EditableText value={props.tags} onChange={props.onUpdateTags} onConfirm={props.onSaveTags} />
				{/* TODO: add space b/w text and tick icon */}
				{props.shouldShowTagsTick ? <div className="pt-icon-tick" style={{color: "green"}} /> : null}
			</div>

		</Collapse>
	</div>
);

SpoilerCard.propTypes = {
	title: PropTypes.string.isRequired,
	tags: PropTypes.string.isRequired,

	isExpanded: PropTypes.bool.isRequired,
	isActive: PropTypes.bool.isRequired,
	isBeingEdited: PropTypes.bool.isRequired,
	shouldShowTagsTick: PropTypes.bool.isRequired,

	onExpandCollapse: PropTypes.func.isRequired,
	onUpdateTitle: PropTypes.func.isRequired,
	onUpdateTags: PropTypes.func.isRequired,
	onSaveTitle: PropTypes.func.isRequired,
	onSaveTags: PropTypes.func.isRequired,

	marginBottom: PropTypes.number.isRequired
};

export default SpoilerCard;
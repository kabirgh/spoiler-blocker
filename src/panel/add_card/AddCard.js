import React from "react";
const PropTypes = React.PropTypes;
import {Button} from "@blueprintjs/core";

const AddNewCard = props => (
	<div className="pt-card" style={{backgroundColor: "#EBF1F5", position: "relative"}}>
		<div className="pt-navbar-group" style={{position: "absolute", top: 0, right: 0, paddingRight: 10}}>
			<button className={"pt-button pt-minimal pt-icon-cross"} onClick={props.onClose} />
		</div>
		<div>
			{/* TODO: extract component, maintaing spacing */}
			<label className="pt-label pt-inline">
				Title  {/* 2 spaces after 'Title' */}
				<input className="pt-input" style={{width: 200}} type="text" 
					dir="auto" onChange={props.onUpdateTitle} />
			</label>
			<label className="pt-label pt-inline">
				Tags  {/* 2 spaces after 'Tags' */}
				<input className="pt-input" style={{width: 200}} type="text" 
					dir="auto" onChange={props.onUpdateTags} />
			</label>
		</div>
		<Button className="pt-intent-primary" text="Add" onClick={props.onSave} />
		&nbsp;&nbsp;
		<Button text="Discard" onClick={props.onClose}/>
	</div>
);

AddNewCard.propTypes = {
	onSave: PropTypes.func.isRequired,
	onUpdateTitle: PropTypes.func.isRequired,
	onUpdateTags: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired
};

export default AddNewCard;
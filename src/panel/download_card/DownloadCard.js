import React from "react";
const PropTypes = React.PropTypes;
import {Button} from "@blueprintjs/core";

const DownloadNewCard = props => (
	<div className="pt-card" style={{backgroundColor: "#EBF1F5", position: "relative"}}>
		<div className="pt-navbar-group" style={{position: "absolute", top: 0, right: 0, paddingRight: 10}}>
			<button className={"pt-button pt-minimal pt-icon-cross"} onClick={props.onClose} />
		</div>
		<div>
			{/* TODO: extract component, maintaing spacing */}
			<label className="pt-label pt-inline">
				Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/* 5 spaces after 'Title' */}
				<input className="pt-input" style={{width: 100}} type="text"
					dir="auto" onChange={props.onUpdateTitle} />
			</label>
			<label className="pt-label pt-inline">
				List ID&nbsp;&nbsp;{/* 2 spaces after 'List ID' */}
				<input className="pt-input" style={{width: 100}} type="text"
					dir="auto" onChange={props.onUpdateID} />
			</label>
		</div>
		<Button className="pt-intent-primary" text="Download" onClick={props.onDownload} />
		&nbsp;&nbsp;
		<Button text="Discard" onClick={props.onClose}/>
	</div>
);

DownloadNewCard.propTypes = {
	onDownload: PropTypes.func.isRequired,
	onUpdateTitle: PropTypes.func.isRequired,
	onUpdateID: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired
};

export default DownloadNewCard;

import React from "react";
const PropTypes = React.PropTypes;
import {Card, CardHeader, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const SpoilerCard = props => (
	<Card style={{paddingBottom: 16}}>
		<CardHeader
			title={props.title}
			subtitle={props.isActive ? "Active" : "Inactive"}
			actAsExpander={true}
			showExpandableButton={true}
			style={{paddingBottom: 0}}
		/>
		<CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
			<TextField
				defaultValue={props.keywords}
				floatingLabelText="Tags"
				onChange={props.onUpdateKeywords} // change internal state
			/>
			{/*TODO: right-align button*/}
			<RaisedButton 
				label="Save" 
				primary={true} 
				onClick={props.onSaveButtonPress}
			/>
			<br />
		</CardText>
	</Card>
);

SpoilerCard.propTypes = {
	title: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	keywords: PropTypes.string.isRequired,
	onUpdateKeywords: PropTypes.func.isRequired,
	onSaveButtonPress: PropTypes.func.isRequired
};

export default SpoilerCard;
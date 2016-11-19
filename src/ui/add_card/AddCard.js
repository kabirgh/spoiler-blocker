import React from "react";
const PropTypes = React.PropTypes;
import {Card, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const AddNewCard = props => (
	<Card expanded={props.visible}>
		<CardText expandable={true} style={{paddingTop: 2, paddingBottom: 4}}>
			<TextField fullWidth={true} multiLine={true}
				floatingLabelText="Title"
			/>
			<br/>
			<TextField fullWidth={true} multiLine={true}
				floatingLabelText="Tags"
			/>
			<RaisedButton 
				label="Save new list" 
				primary={true}
				onClick={props.onSaveButtonPress}
			/>
			{/* TODO: discard button */}
		</CardText>
	</Card>
);

AddNewCard.propTypes = {
	visible: PropTypes.bool.isRequired,
	onSaveButtonPress: PropTypes.func.isRequired
};

export default AddNewCard;
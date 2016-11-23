import React from "react";
const PropTypes = React.PropTypes;
import {Card, CardHeader, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const AddNewCard = props => (
	<Card>
		<CardText style={{paddingTop: 2, paddingBottom: 4}}>
			<TextField 
				fullWidth={true} 
				multiLine={true}
				floatingLabelText="Title"
				onChange={props.onUpdateTitle}
			/>
			<br/>
			<TextField 
				fullWidth={true} 
				multiLine={true}
				floatingLabelText="Tags"
				onChange={props.onUpdateTags}
			/>
			<RaisedButton 
				label="Save new list" 
				primary={true}
				onTouchTap={props.onSaveButtonPress}
			/>
			{/* TODO: discard button */}
		</CardText>
	</Card>
);

AddNewCard.propTypes = {
	visible: PropTypes.bool.isRequired,
	onSaveButtonPress: PropTypes.func.isRequired,
	onUpdateTitle: PropTypes.func.isRequired,
	onUpdateTags: PropTypes.func.isRequired
};

export default AddNewCard;
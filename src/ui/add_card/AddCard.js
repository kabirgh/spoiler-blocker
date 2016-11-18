import React from "react";
const PropTypes = React.PropTypes;
import {Card, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";

const AddNewCard = props => (
	<Card expanded={props.expanded}>
		<CardText expandable={true} style={{paddingTop: 2, paddingBottom: 4}}>
			<TextField fullWidth={true} multiLine={true}
				floatingLabelText="Title"
			/>
			<br/>
			<TextField fullWidth={true} multiLine={true}
				floatingLabelText="Tags"
			/>
		</CardText>
	</Card>
);

AddNewCard.propTypes = {
	expanded: PropTypes.bool.isRequired
};

export default AddNewCard;
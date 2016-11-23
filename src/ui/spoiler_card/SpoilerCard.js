import React from "react";
const PropTypes = React.PropTypes;
import {Card, CardHeader, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import {observer} from "mobx-react";

const SpoilerCard = observer(props => 
	<Card expandable={true} style={{paddingBottom: 16}}>
		<CardHeader
			title={props.title}
			subtitle={props.isActive ? "Active" : "Inactive"}
			actAsExpander={true}
			showExpandableButton={true}
			style={{paddingBottom: 0}}
			openIcon={ // TODO: figure out this prop is being assigned to child <div> instead of child <CardExpandable>
				<ContentAdd />
			}
		/>
		<CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
			<TextField
				defaultValue={props.keywords}
				floatingLabelText="Tags"
				onChange={props.onUpdateKeywords} // change internal state
			/>
			{/* TODO: right-align button, show only when textfield is active */}
			<RaisedButton 
				label="Save" 
				primary={true} 
				onTouchTap={props.onSaveButtonPress}
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
import React from "react";
const PropTypes = React.PropTypes;
import TitleBar from "../titlebar/TitleBar";
import AddCard from "../add_card/AddCard";
import SpoilerCardContainer from "./SpoilerCardContainer";

// Renders list of SpoilerCardContainers
const SpoilerCardList = props => (
	<div>
		<TitleBar />
		<br />
		<AddCard expanded={true} />
		<br />
		{Object.keys(props.spoilersObj).map( title => (
			<div key={title}>
				<SpoilerCardContainer 
					title={title} 
					isActive={props.spoilersObj[title]["isActive"]}
					keywords={props.spoilersObj[title]["tags"].join(", ")}
				/>
				<br />
			</div>
		))}
	</div>
);

SpoilerCardList.propTypes = {
	spoilersObj: PropTypes.object.isRequired
};

export default SpoilerCardList;
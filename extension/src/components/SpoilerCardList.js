import React from "react";
const PropTypes = React.PropTypes;
import SpoilerCardContainer from "../containers/SpoilerCardContainer";

// Renders list of SpoilerCardContainers
const SpoilerCardList = props => (
	<div>
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
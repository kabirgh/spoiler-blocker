import React from "react";
// const PropTypes = React.PropTypes;
import SpoilerCardContainer from "./SpoilerCardContainer";

// Renders list of SpoilerCardContainers
const SpoilerCardList = props => (
	<div>
		{props.spoilers.map((obj, index) => (
			<div key={obj["title"]}>
				<SpoilerCardContainer 
					index={index}
					title={obj["title"]} 
					isActive={obj["isActive"]}
					keywords={obj["tags"].join(", ")}
				/>
				<br />
			</div>
		))}
	</div>
);

// TODO: validate props.spoilers propType

export default SpoilerCardList;
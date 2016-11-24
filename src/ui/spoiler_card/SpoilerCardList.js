import React from "react";
// const PropTypes = React.PropTypes;
import SpoilerCardContainer from "./SpoilerCardContainer";
import {observer} from "mobx-react";

// Renders list of SpoilerCardContainers
const SpoilerCardList = observer(props => 
	<div>
		{props.spoilers.map((obj, index) => (
			<SpoilerCardContainer 
				key={obj["title"]}
				index={index}
				title={obj["title"]} 
				isActive={obj["isActive"]}
				tags={obj["tags"].join(", ")}
			/>
		))}
	</div>
);

// TODO: validate props.spoilers propType

export default SpoilerCardList;
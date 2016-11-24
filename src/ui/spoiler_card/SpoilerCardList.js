import React from "react";
// const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import SpoilerCardContainer from "./SpoilerCardContainer";

// Renders list of SpoilerCardContainers
const SpoilerCardList = observer(props => 
	<div>
		{props.spoilers.map((obj, index) => (
			<div>
				<SpoilerCardContainer 
					key={obj["title"]}
					index={index}
					title={obj["title"]} 
					isActive={obj["isActive"]}
					tags={obj["tags"].join(", ")}
				/>
				<br />
			</div>
		))}
	</div>
);

// TODO: validate props.spoilers propType

export default SpoilerCardList;
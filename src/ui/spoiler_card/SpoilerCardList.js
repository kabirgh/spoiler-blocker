import React from "react";
// const PropTypes = React.PropTypes;
import SpoilerCardContainer from "./SpoilerCardContainer";
import {observer} from "mobx-react";

// Renders list of SpoilerCardContainers
const SpoilerCardList = observer(props => 
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
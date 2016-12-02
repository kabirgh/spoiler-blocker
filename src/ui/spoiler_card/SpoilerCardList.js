import React from "react";
// const PropTypes = React.PropTypes;
import {observer} from "mobx-react";
import SpoilerCardContainer from "./SpoilerCardContainer";

// Renders list of SpoilerCardContainers
const SpoilerCardList = observer(props => 
	<div>
		{props.spoilers.map((obj, index) => (
			<div key={obj["title"]}>
				<SpoilerCardContainer 
					index={index}
					title={obj["title"]} 
					isActive={obj["isActive"]}
					tags={obj["tags"].join(", ")}
					marginBottom={6} // TODO: should this be a mobx observable?
				/>
			</div>
		))}
	</div>
);

// TODO: validate props.spoilers propType

export default SpoilerCardList;
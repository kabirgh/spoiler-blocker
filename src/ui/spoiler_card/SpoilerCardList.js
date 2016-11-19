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

SpoilerCardList.propTypes = {
	spoilers: PropTypes.array.isRequired
};

export default SpoilerCardList;
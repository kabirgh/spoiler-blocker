import React from "react";
import SpoilerCardContainer from "./SpoilerCardContainer";
import store from "../store";

// Renders list of SpoilerCardContainers
const SpoilerCardList = () => (
	<div>
		{store.spoilers.map((obj, index) => (
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

export default SpoilerCardList;
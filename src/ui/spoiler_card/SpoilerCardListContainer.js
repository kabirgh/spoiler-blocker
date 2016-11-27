import React from "react";
import SpoilerCardList from "./SpoilerCardList";
import {observer} from "mobx-react";
import MainStore from "../MainStore";

@observer
class SpoilerCardListContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	// TODO: add 'see more' expander

	render() {
		return (
			<SpoilerCardList spoilers={MainStore.spoilers} />
		);
	}
}

export default SpoilerCardListContainer;
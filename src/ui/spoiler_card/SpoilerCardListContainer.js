import React from "react";
import SpoilerCardList from "./SpoilerCardList";
import {observer} from "mobx-react";
import store from "../store";

@observer
class SpoilerCardListContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	// TODO: add 'see more' expander

	render() {
		return (
			<SpoilerCardList spoilers={store.spoilers} />
		);
	}
}

export default SpoilerCardListContainer;
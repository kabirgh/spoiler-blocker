import React from "react";
import {observer} from "mobx-react";
import {observable, computed, autorun} from "mobx";
import {Button} from "@blueprintjs/core";
import MainStore from "../MainStore";
import SpoilerCardList from "./SpoilerCardList";
import spoilerCardListActions from "./spoilerCardListActions";

@observer
class SpoilerCardListContainer extends React.Component {
	@observable SHOW_LESS_NUM = 5;
	@observable showState = "less";

	constructor(props) {
		super(props);

		this.handleSeeMore = this.handleSeeMore.bind(this);
	}

	handleSeeMore() {
		spoilerCardListActions.toggleShow();
	}

	render() {
		return (
			<div>
				<SpoilerCardList spoilers={
						MainStore.spoilers.slice(0, spoilerCardListActions.getNumToShow(MainStore.spoilers.length))
					} />
				<Button className="pt-intent-primary" text="See More" onClick={this.handleSeeMore} />
			</div>
		);
	}
}

export default SpoilerCardListContainer;

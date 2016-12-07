import React from "react";
import {observer} from "mobx-react";
import {observable, computed} from "mobx";
import {Button} from "@blueprintjs/core";
import MainStore from "../MainStore";
import SpoilerCardList from "./SpoilerCardList";

@observer
class SpoilerCardListContainer extends React.Component {
	@observable isShowingLess = true;
	@observable SHOW_LESS_NUM = 2; // TODO: move this out in the global options store (where all defaults are set)
	
	@computed get numListsToShow() {
		if (this.isShowingLess) {
			return Math.min(this.SHOW_LESS_NUM, MainStore.spoilers.length);
		}
		else {
			return MainStore.spoilers.length;
		}
	}

	constructor(props) {
		super(props);

		this.handleSeeMore = this.handleSeeMore.bind(this);
	}

	handleSeeMore() {
		this.isShowingLess = !this.isShowingLess;
	}

	render() {
		return (
			<div>
				<SpoilerCardList spoilers={
						MainStore.spoilers.slice(0, this.numListsToShow)
					} />
				{(MainStore.spoilers.length > this.numListsToShow) // Only show button if there are more lists to show
					? <Button className="pt-intent-primary" text="See More" onClick={this.handleSeeMore} />
					: null}
			</div>
		);
	}
}

export default SpoilerCardListContainer;

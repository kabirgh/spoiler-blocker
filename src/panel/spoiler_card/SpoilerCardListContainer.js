import React from "react";
import {observer} from "mobx-react";
import {observable, computed} from "mobx";
import {Button} from "@blueprintjs/core";
import MainStore from "../common/MainStore";
import SpoilerCardList from "./SpoilerCardList";

@observer
class SpoilerCardListContainer extends React.Component {
	@observable isShowingLess = true;
	@observable SHOW_LESS_NUM = 5; // TODO: move this out in the global options store (where all defaults are set)

	@computed get numListsToShow() {
		if (this.isShowingLess) {
			return Math.min(this.SHOW_LESS_NUM, MainStore.spoilers.length);
		}
		else {
			return MainStore.spoilers.length;
		}
	}

	@computed get SeeButton() {
		if (MainStore.spoilers.length > this.numListsToShow && this.isShowingLess) {
			return <Button className="pt-intent-primary" text="See More" onClick={this.handleSeeMoreLess} />;
		}
		else if (!this.isShowingLess) {
			return <Button className="pt-intent-primary" text="See Less" onClick={this.handleSeeMoreLess} />;
		}
		else {
			return null;
		}
	}

	constructor(props) {
		super(props);

		this.handleSeeMoreLess = this.handleSeeMoreLess.bind(this);
	}

	handleSeeMoreLess() {
		this.isShowingLess = !this.isShowingLess;
	}

	render() {
		return (
			<div>
				<SpoilerCardList spoilers={MainStore.spoilers.slice(0, this.numListsToShow)} />
				{this.SeeButton}
			</div>
		);
	}
}

export default SpoilerCardListContainer;

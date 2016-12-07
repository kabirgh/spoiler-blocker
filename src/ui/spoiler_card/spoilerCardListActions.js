import {action} from "mobx";
import MainStore from "../MainStore";
import SpoilerCardListContainer from "./SpoilerCardListContainer";

module.exports = {
	getNumToShow: action(getNumToShow),
	toggleShow: action(toggleShow)
};

function getNumToShow(len) {
  console.log(SpoilerCardListContainer.showState);
  console.log(SpoilerCardListContainer.SHOW_LESS_NUM);
  console.log(len);
  if (SpoilerCardListContainer.showState === "less") {
    SpoilerCardListContainer.showHowMany =
      Math.min(SpoilerCardListContainer.SHOW_LESS_NUM, len)
  } else {
    SpoilerCardListContainer.showHowMany =
      Math.max(SpoilerCardListContainer.SHOW_LESS_NUM, len)
  }
}

function toggleShow() {
  if (SpoilerCardListContainer.showState === "less") {
    SpoilerCardListContainer.showState = "more";
  } else {
    SpoilerCardListContainer.showState = "less";
  }
}

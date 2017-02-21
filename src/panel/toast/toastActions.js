import {action} from "mobx";
import MainStore from "../common/MainStore";

module.exports = {
	undoLastDelete: action(undoLastDelete)
};

function undoLastDelete() {
	const deletedObj = MainStore.deletedStack.pop();
	MainStore.spoilers.splice(deletedObj["index"], 0, deletedObj["obj"]);
}
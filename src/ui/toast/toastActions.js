import {action} from "mobx";
import ToastStore from "../ToastStore";

module.exports = {
	markToastAsRendered: action(markToastAsRendered)
};

function markToastAsRendered() {
	ToastStore.shouldRenderToast = false;
}
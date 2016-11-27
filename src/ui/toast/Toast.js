import React from "react";
import {observer} from "mobx-react";
import {Toaster, Position} from "@blueprintjs/core";
import ToastStore from "../ToastStore";
import toastActions from "./toastActions";

@observer
class Toast extends React.Component {
	constructor(props) {
		super(props);

		this.toaster = Toaster.create({
			className: "top-toaster",
			autoFocus: false,
			canEscapeKeyClear: true,
			position: Position.TOP
		});
	}

	shouldComponentUpdate() {
		return ToastStore.shouldRenderToast === true;
	}

	componentWillUpdate() {
		if (ToastStore.toastObject !== null) {
			this.toaster.show(ToastStore.toastObject);
		}

		toastActions.markToastAsRendered();
	}

	// TODO
	// Warning: _renderNewRootComponent(): Render methods should be a pure function of 
	// props and state; triggering nested component updates from render is not allowed. 
	// If necessary, trigger nested updates in componentDidUpdate. Check the render method of Toast.
	render() {
		return (
			<div>
				{ToastStore.allFlags === "Force re-render when any flag changes" ? null : null}
			</div>
		);
	}
}

export default Toast;
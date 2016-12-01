import React from "react";
import {observer} from "mobx-react";
import {Toaster, Position} from "@blueprintjs/core";
import ToastStore from "./ToastStore";

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

	componentDidUpdate() {
		if (ToastStore.toastObject !== null) {
			this.toaster.show(ToastStore.toastObject);
		}
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
import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import {observer} from "mobx-react";
import OptionStore from "../panel/OptionStore";
import optionsActions from "./optionsActions";
import {FocusStyleManager} from "@blueprintjs/core";
import {Switch} from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

@observer
class App extends React.Component {
	constructor(props) {
		super(props);
	}

	handleToggleCaseSensitivity() {
		optionsActions.toggleCaseSensitivity();
	}

	handleToggleHidePref() {
		optionsActions.toggleHidePref();
	}

	render() {
		return (

			<div>
				{process.env.NODE_ENV === "production" ? null : <Devtools />}
				<h3>{"Default preferences"}</h3>
				{"New lists created will have the following default preferences."}
				<br /><br/>

				<Switch
					label="Case sensitive"
					checked={OptionStore.defaultCaseSensitivity}
					onChange={this.handleToggleCaseSensitivity}
				/>
				<Switch
					label="Overlay/remove" // TODO: clearer label
					checked={OptionStore.defaultHidePref === "remove"}
					onChange={this.handleToggleHidePref}
				/>
			</div>

		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("app")
);
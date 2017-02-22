import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import {observer} from "mobx-react";
import OptionStore from "../panel/common/OptionStore";
import optionsActions from "./optionsActions";
import {FocusStyleManager} from "@blueprintjs/core";
import {Switch, NumericInput} from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

@observer
class App extends React.Component {
	constructor(props) {
		super(props);

		this.handleToggleCaseSensitivity = this.handleToggleCaseSensitivity.bind(this);
		this.handleToggleHidePref = this.handleToggleHidePref.bind(this);
		this.handleSeeMoreNumChange = this.handleSeeMoreNumChange.bind(this);
	}

	handleToggleCaseSensitivity() {
		optionsActions.toggleCaseSensitivity();
	}

	handleToggleHidePref() {
		optionsActions.toggleHidePref();
	}

	handleSeeMoreNumChange(value) {
		console.log("option store value: " + OptionStore.prefs["seeMoreNum"]);
		console.log("value: " + value);
		optionsActions.changeSeeMoreNum(value);
	}

	render() {
		return (

			<div>
				{process.env.NODE_ENV === "production" ? null : <Devtools />}
				<h4>{"Default preferences"}</h4>
				{"New lists created will have the following default preferences."}
				<br /><br/>

				{console.log("def cs: " + OptionStore.prefs.defaultCaseSensitivity)}
				{console.log("def hp: " + OptionStore.prefs.defaultHidePref)}

				<Switch
					label="Case sensitive"
					checked={OptionStore.prefs["defaultCaseSensitivity"]}
					onChange={this.handleToggleCaseSensitivity}
				/>
				<Switch
					label="Overlay/remove" // TODO: clearer label
					checked={OptionStore.prefs["defaultHidePref"] === "remove"}
					onChange={this.handleToggleHidePref}
				/>
				<br />
				{"Number of lists to show"}
				<NumericInput
					value={OptionStore.prefs["seeMoreNum"]}
					onValueChange={this.handleSeeMoreNumChange}
					min={1}
					minorStepSize={1}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("app")
);
import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TitleBar from "./titlebar/TitleBar";
import AddCard from "./add_card/AddCard";
import SpoilerCardList from "./spoiler_card/SpoilerCardList";

const App = () => (
	<MuiThemeProvider>
		<div>
			<TitleBar /><br />
			<AddCard expanded={true} /><br />
			<SpoilerCardList />
		</div>
	</MuiThemeProvider>
);

injectTapEventPlugin();

ReactDOM.render(
	<App />,
	document.getElementById("app")
);
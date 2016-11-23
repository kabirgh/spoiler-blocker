import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import Devtools from "mobx-react-devtools";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TitleBarContainer from "./title_bar/TitleBarContainer";
import AddCardContainer from "./add_card/AddCardContainer";
import SpoilerCardListContainer from "./spoiler_card/SpoilerCardListContainer";

const App = () => (
	<MuiThemeProvider>
		<div>
			<Devtools />
			<TitleBarContainer />
			<AddCardContainer />
			<SpoilerCardListContainer />
		</div>
	</MuiThemeProvider>
);

injectTapEventPlugin();

ReactDOM.render(
	<App />,
	document.getElementById("app")
);
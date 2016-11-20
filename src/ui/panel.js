import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TitleBarContainer from "./title_bar/TitleBarContainer";
import AddCardContainer from "./add_card/AddCardContainer";
import SpoilerCardListContainer from "./spoiler_card/SpoilerCardListContainer";

const App = () => (
	<MuiThemeProvider>
		<div>
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
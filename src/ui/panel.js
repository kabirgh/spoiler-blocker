import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import TitleBarContainer from "./title_bar/TitleBarContainer";
import AddCardContainer from "./add_card/AddCardContainer";
import SpoilerCardListContainer from "./spoiler_card/SpoilerCardListContainer";
import {observer} from "mobx-react";
import {FocusStyleManager} from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

const App = observer( () => 
	<div>
		<Devtools />
		<TitleBarContainer />
		<AddCardContainer />		
		<br />
		<SpoilerCardListContainer />
	</div>
);

ReactDOM.render(
	<App />,
	document.getElementById("app")
);
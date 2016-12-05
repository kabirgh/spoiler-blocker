import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import Toast from "./toast/Toast";
import TitleBarContainer from "./title_bar/TitleBarContainer";
import AddCardContainer from "./add_card/AddCardContainer";
import SpoilerCardListContainer from "./spoiler_card/SpoilerCardListContainer";
import {observer} from "mobx-react";
import {FocusStyleManager} from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

const App = observer( () => 
	<div>
		{process.env.NODE_ENV === "production" ? null : <Devtools />}
		<Toast />
		<TitleBarContainer />
		<div style={{paddingTop: 35}}>
			<AddCardContainer />
			<br />
			<SpoilerCardListContainer />
		</div>
	</div>
);

ReactDOM.render(
	<App />,
	document.getElementById("app")
);
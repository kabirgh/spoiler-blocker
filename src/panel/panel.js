import React from "react";
import ReactDOM from "react-dom";
import Toast from "./toast/Toast";
import TitleBarContainer from "./title_bar/TitleBarContainer";
import AddCardContainer from "./add_card/AddCardContainer";
import DownloadCardContainer from "./download_card/DownloadCardContainer";
import SpoilerCardListContainer from "./spoiler_card/SpoilerCardListContainer";
import {observer} from "mobx-react";
import {FocusStyleManager} from "@blueprintjs/core";
if (process.env.NODE_ENV !== "production") {
	const Devtools = require("mobx-react-devtools");
}

FocusStyleManager.onlyShowFocusOnTabs();

const App = observer( () =>
	<div>
		{process.env.NODE_ENV === "production" ? null : <Devtools />}
		<Toast />
		<TitleBarContainer />
		<div style={{paddingTop: 35}}>
			<AddCardContainer />
			<DownloadCardContainer />
			<br />
			<SpoilerCardListContainer />
		</div>
	</div>
);

ReactDOM.render(
	<App />,
	document.getElementById("app")
);

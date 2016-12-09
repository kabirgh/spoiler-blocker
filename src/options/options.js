import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import {observer} from "mobx-react";
import {FocusStyleManager} from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

const App = observer( () =>
	<div>
		{process.env.NODE_ENV === "production" ? null : <Devtools />}
	</div>
);

ReactDOM.render(
	<App />,
	document.getElementById("app")
);

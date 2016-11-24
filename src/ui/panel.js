import React from "react";
import ReactDOM from "react-dom";
import Devtools from "mobx-react-devtools";
import TitleBarContainer from "./title_bar/TitleBarContainer";
import AddCardContainer from "./add_card/AddCardContainer";
import SpoilerCardListContainer from "./spoiler_card/SpoilerCardListContainer";
import {observer} from "mobx-react";
import store from "./store";

const App = observer( () => 
	<div>
		<Devtools />
		<TitleBarContainer />
		{store.isAddCardVisible ? <AddCardContainer /> : <div />}			
		<br />
		<SpoilerCardListContainer />
	</div>
);

ReactDOM.render(
	<App />,
	document.getElementById("app")
);
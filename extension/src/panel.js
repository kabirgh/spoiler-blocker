import React from "react";
const PropTypes = React.PropTypes;
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SpoilerCardList from "./components/SpoilerCardList";

const App = props => (
	<MuiThemeProvider>
		<SpoilerCardList spoilersObj={props.spoilersObj} />
	</MuiThemeProvider>
);

App.propTypes = {
	spoilersObj: PropTypes.object.isRequired
};


const testSpoilersObj = 
	{
		"spoiler-list-name":
		{
			"isActive": true,
			"isCaseSensitive": true,
			"hidePref": "overlay",
			"tags": ["tag1", "tag2"]
		},
		"all-posts":
		{
			"isActive": true,
			"isCaseSensitive": false,
			"hidePref": "overlay",
			"tags": ["a", "b", "c"]
		}
	};


injectTapEventPlugin();

ReactDOM.render(
	<App spoilersObj={testSpoilersObj} />,
	document.getElementById("app")
);
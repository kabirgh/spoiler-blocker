import React from "react";
const PropTypes = React.PropTypes;
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SpoilerCardList from "./spoiler_card/SpoilerCardList";

const App = props => (
	<MuiThemeProvider>
		<SpoilerCardList spoilers={props.spoilers} />
	</MuiThemeProvider>
);

App.propTypes = {
	spoilers: PropTypes.array.isRequired
};


const testSpoilers = 
	[
		{
			"title": "spoiler-tag1-tag2",
			"isActive": true,
			"isCaseSensitive": true,
			"hidePref": "overlay",
			"tags": ["tag1", "tag2"]
		},
		{
			"title": "all-posts",
			"isActive": true,
			"isCaseSensitive": false,
			"hidePref": "overlay",
			"tags": ["a", "b", "c"]
		}
	];


injectTapEventPlugin();

ReactDOM.render(
	<App spoilers={testSpoilers} />,
	document.getElementById("app")
);
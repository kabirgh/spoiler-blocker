import React from "react";
const PropTypes = React.PropTypes;

// TODO: convert to blueprintjs react component if possible
const TitleBar = props => (
	<nav className="pt-navbar pt-dark pt-fixed-top">
	<div style={{margin: "0 auto"}}>
		<div className="pt-navbar-group pt-align-left">
			<div className="pt-navbar-heading">Kenzor</div>
			<input className="pt-input" placeholder="Search lists..." type="text" style={{width:150}}/>
		</div>
		<div className="pt-navbar-group pt-align-right">
			<button 
				className="pt-button pt-minimal pt-icon-add"
				onClick={props.onAddList}>
					Add a list
			</button>
			<span className="pt-navbar-divider"></span>
			<button className="pt-button pt-minimal pt-icon-cog"></button>
		</div>
		</div>
	</nav>
);

TitleBar.propTypes = {
	onAddList: PropTypes.func.isRequired
};

export default TitleBar;
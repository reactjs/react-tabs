/** @jsx React.DOM */
var React = require('react'),
	TabPanel = require('../lib/tabpanel');

var App = React.createClass({
	render: function () {
		return (
			<div>
				<h1>React TabPanel</h1>
				<TabPanel/>
			</div>
		);
	}
});

React.renderComponent(<App/>, document.body);

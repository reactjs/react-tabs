/** @jsx React.DOM */
var React = require('react'),
	TabPanel = require('../lib/main').TabPanel,
	Tab = require('../lib/main').Tab;

var App = React.createClass({
	render: function () {
		return (
			<div>
				<h1>React TabPanel</h1>
				<TabPanel>
					<Tab label="Tab 1">Hello from Tab 1</Tab>
					<Tab label="Tab 2">Hello from Tab 2</Tab>
					<Tab label="Tab 3">Hello from Tab 3</Tab>
				</TabPanel>
			</div>
		);
	}
});

React.renderComponent(<App/>, document.body);

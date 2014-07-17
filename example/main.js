/** @jsx React.DOM */
var React = require('react'),
	ReactTabs = require('../lib/main'),
	Tabs = ReactTabs.Tabs,
	Tab = ReactTabs.Tab,
	TabList = ReactTabs.TabList,
	TabPanel = ReactTabs.TabPanel;

var App = React.createClass({
	render: function () {
		return (
			<div>
				<h1>React TabPanel</h1>
				<Tabs>
					<TabList>
						<Tab>Tab 1</Tab>
						<Tab>Tab 2</Tab>
						<Tab>Tab 3</Tab>
					</TabList>

					<TabPanel>Hello from Tab 1</TabPanel>
					<TabPanel>Hello from Tab 2</TabPanel>
					<TabPanel>Hello from Tab 3</TabPanel>
				</Tabs>
			</div>
		);
	}
});

React.renderComponent(<App/>, document.body);

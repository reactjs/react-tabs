# react-tabs

React tabs component

## Installing

```bash
npm install react-tabs
```

## Demo

http://mzabriskie.github.io/react-tabs/example/

## Example

```js
/** @jsx React.DOM */
var React = require('react'),
	ReactTabs = require('react-tabs'),
	Tabs = ReactTabs.Tabs,
	Tab = ReactTabs.Tab,
	TabList = ReactTabs.TabList,
	TabPanel = ReactTabs.TabPanel;

var App = React.createClass({
	render: function () {
		return (
			<Tabs>
				<TabList>
					<Tab>Foo</Tab>
					<Tab>Bar</Tab>
					<Tab>Baz</Tab>
				</TabList>

				<TabPanel>
					<h2>Hello from Foo</h2>
				</TabPanel>
				<TabPanel>
					<h2>Hello from Bar</h2>
				</TabPanel>
				<TabPanel>
					<h2>Hello from Baz</h2>
				</TabPanel>
			</Tabs>
		);
	}
});

React.renderComponent(<App/>, document.body);

```
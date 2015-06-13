var React = require('react');
var ReactTabs	= require('../../lib/main');
var Tab	= ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList	= ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var App = React.createClass({
  handleInputChange: function () {
    this.forceUpdate();
  },

	render: function () {
		return (
			<div style={{padding: 50}}>
        <Tabs>
					<TabList>
						<Tab>First</Tab>
						<Tab>Second</Tab>
					</TabList>
					<TabPanel>
            <p>Tab to focus `First`, then arrow to select `Second`.</p>
					</TabPanel>
					<TabPanel>
            <p>Tab to focus input, then begin typing. Focus should stay.</p>
            <input
              type="text"
              onChange={this.handleInputChange}
            />
					</TabPanel>
				</Tabs>
			</div>
		);
	}
});

React.render(<App/>, document.getElementById('example'));


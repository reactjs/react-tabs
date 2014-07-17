/** @jsx React.DOM */
var React = require('react');

var id = 0;
function guid() {
	return 'react-tabs-' + (id++);
}

module.exports = React.createClass({
	getInitialState: function () {
		return {
			selectedIndex: -1
		};
	},

	setSelected: function (index) {
		var tabs = this.getTabs(),
			panels = this.getPanels();

		// Short circuit if already processing
		if (this.__processingSelected) return;
		// Don't do anything if nothing has changed
		if (index === this.state.selectedIndex) return;
		// Check index boundary
		if (index < 0 || index >= tabs.length) return;

		// Flag so that setSelected doesn't go recursive
		this.__processingSelected = true;

		// Reset currently selected
		if (this.state.selectedIndex >= 0) {
			tabs[this.state.selectedIndex].setSelected(false);
			panels[this.state.selectedIndex].setSelected(false);
		}

		// Update selected
		this.setState({ selectedIndex: index });
		tabs[index].setSelected(true);
		panels[index].setSelected(true);

		// Clear flag
		delete this.__processingSelected;

		// Call change event handler
		if (typeof this.props.onSelectedChange === 'function') {
			this.props.onSelectedChange(index, tabs[index], panels[index], this);
		}
	},

	getTabs: function () {
		return this.props.children[0].props.children;
	},

	getPanels: function () {
		return this.props.children.slice(1);
	},

	componentDidMount: function () {
		var selectedIndex = this.props['selected-index'] || 0,
			tabs = this.getTabs(),
			panels = this.getPanels();

		for (var i=0, l=tabs.length; i<l; i++) {
			var tab = tabs[i],
				panel = panels[i];

			// Hook up aria attributes
			var tabId = tab.state.id,
				tabState = {},
				panelId = panel.state.id,
				panelState = {};

			if (tabId === null) {
				tabId = guid();
				tabState.id = tabId;
			}

			if (panelId === null) {
				panelId = guid();
				panelState.id = panelId;
			}

			tabState.index = i;
			tabState.controls = panelId;
			panelState.labeledby = tabId;

			tab.setState(tabState);
			panel.setState(panelState);

			// Handle selected tab change
			tab.props.onSelectedChange = function (selected, tab) {
				if (selected) {
					this.setSelected(tab.state.index);
				}
			}.bind(this);
		}

		this.setSelected(selectedIndex);
	},

	render: function () {
		return (
			<div className="react-tabs">
				{this.props.children}
			</div>
		);
	}
});

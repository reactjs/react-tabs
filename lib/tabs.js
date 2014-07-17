/** @jsx React.DOM */
var React = require('react');

var id = 0;
function guid() {
	return 'react-tabs-' + (id++);
}

module.exports = React.createClass({
	getInitialState: function () {
		return {
			activeIndex: -1
		};
	},

	setActive: function (index) {
		var tabs = this.getTabs(),
			panels = this.getPanels();

		// Short circuit if already processing
		if (this.__processingActive) return;
		// Don't do anything if nothing has changed
		if (index === this.state.activeIndex) return;
		// Check index boundary
		if (index < 0 || index >= tabs.length) return;

		// Flag so that setActive doesn't go recursive
		this.__processingActive = true;

		// Reset currently active
		if (this.state.activeIndex >= 0) {
			tabs[this.state.activeIndex].setActive(false);
			panels[this.state.activeIndex].setActive(false);
		}

		// Update active
		this.setState({ activeIndex: index });
		tabs[index].setActive(true);
		panels[index].setActive(true);

		// Clear flag
		delete this.__processingActive;

		// Call change event handler
		if (typeof this.props.onActiveChange === 'function') {
			this.props.onActiveChange(index, tabs[index], panels[index], this);
		}
	},

	getTabs: function () {
		return this.props.children[0].props.children;
	},

	getPanels: function () {
		return this.props.children.slice(1);
	},

	componentDidMount: function () {
		var activeIndex = this.props['active-index'] || 0,
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

			// Handle active tab change
			tab.props.onActiveChange = function (active, tab) {
				if (active) {
					this.setActive(tab.state.index);
				}
			}.bind(this);
		}

		this.setActive(activeIndex);
	},

	render: function () {
		return (
			<div className="react-tabs">
				{this.props.children}
			</div>
		);
	}
});

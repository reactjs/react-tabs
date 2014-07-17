/** @jsx React.DOM */
var React = require('react');

var id = 0;
function guid() {
	return 'react-tabs-' + (id++);
}

function isTabNode(node) {
	return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

module.exports = React.createClass({
	getInitialState: function () {
		return {
			selectedIndex: -1
		};
	},

	setSelected: function (index, focus) {
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
		tabs[index].setSelected(true, focus);
		panels[index].setSelected(true);

		// Clear flag
		delete this.__processingSelected;

		// Call change event handler
		if (typeof this.props.onSelectedChange === 'function') {
			this.props.onSelectedChange(index, tabs[index], panels[index], this);
		}
	},

	getSelectedIndex: function () {
		return this.state.selectedIndex;
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
		}

		this.setSelected(selectedIndex);
	},

	handleClick: function (e) {
		if (isTabNode(e.target)) {
			this.setSelected(e.target.getAttribute('data-index'));
		}
	},

	handleKeyDown: function (e) {
		if (isTabNode(e.target)) {
			var index = this.getSelectedIndex(),
				max = this.getTabs().length - 1;

			// Select next tab to the left
			if (e.keyCode === 37 || e.keyCode === 38) {
				index -= 1;
				// Wrap back to last tab if index is negative
				if (index < 0) {
					index = max;
				}
			}
			// Select next tab to the right
			else if (e.keyCode === 39 || e.keyCode === 40) {
				index += 1;
				// Wrap back to first tab if index exceeds max
				if (index > max) {
					index = 0;
				}
			}

			this.setSelected(index, true);
		}
	},

	render: function () {
		return (
			<div className="react-tabs"
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}>
				{this.props.children}
			</div>
		);
	}
});

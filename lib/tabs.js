/** @jsx React.DOM */
var React = require('react/addons');

function isTabNode(node) {
	return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

module.exports = React.createClass({
	propTypes: {
		selectedIndex: React.PropTypes.number,
		onSelect: React.PropTypes.func
	},

	getDefaultProps: function () {
		return {
			selectedIndex: 0
		};
	},

	getInitialState: function () {
		return {
			selectedIndex: -1
		};
	},

	setSelected: function (index, focus) {
		// Don't do anything if nothing has changed
		if (index === this.getSelectedIndex()) return;
		// Check index boundary
		if (index < 0 || index >= this.getTabs().length) return;

		// Update selected index
		this.__lastSelectedIndex = this.getSelectedIndex();
		this.__needsFocus = focus;
		this.setState({ selectedIndex: index });
	},

	getSelectedIndex: function () {
		return this.state.selectedIndex;
	},

	getTabs: function () {
		return this.props.children[0].props.children;
	},

	getTab: function (index) {
		return this.refs['tabs-' + index];
	},

	getPanel: function (index) {
		return this.refs['panels-' + index];
	},

	componentDidMount: function () {
		var selectedIndex = parseInt(this.props.selectedIndex, 10) || 0;

		// Hook up relation between tabs and panels
		for (var i=0, l=this.getTabs().length; i<l; i++) {
			var tab = this.getTab(i),
				panel = this.getPanel(i);

			tab.setState({ panel: panel.getId() });
			panel.setState({ tab: tab.getId() });
		}

		this.setSelected(selectedIndex);
	},

	componentDidUpdate: function () {
		var index = this.getSelectedIndex(),
			last = this.__lastSelectedIndex;

		// Reset currently selected
		if (typeof last !== 'undefined' && last > -1) {
			this.getTab(last).setSelected(false);
			this.getPanel(last).setSelected(false);
			delete this.__lastSelectedIndex;
		}

		// Update selected
		this.getTab(index).setSelected(true, this.__needsFocus);
		this.getPanel(index).setSelected(true);
		delete this.__needsFocus;

		// Call change event handler
		if (typeof this.props.onSelect === 'function') {
			this.props.onSelect(index, last);
		}
	},

	handleClick: function (e) {
		var node = e.target;
		if (isTabNode(node)) {
			var index = [].slice.call(node.parentNode.children).indexOf(node);
			this.setSelected(index);
		}
	},

	handleKeyDown: function (e) {
		if (isTabNode(e.target)) {
			var index = this.getSelectedIndex(),
				max = this.getTabs().length - 1,
				preventDefault = false;

			// Select next tab to the left
			if (e.keyCode === 37 || e.keyCode === 38) {
				index -= 1;
				preventDefault = true;

				// Wrap back to last tab if index is negative
				if (index < 0) {
					index = max;
				}
			}
			// Select next tab to the right
			else if (e.keyCode === 39 || e.keyCode === 40) {
				index += 1;
				preventDefault = true;

				// Wrap back to first tab if index exceeds max
				if (index > max) {
					index = 0;
				}
			}

			// This prevents scrollbars from moving around
			if (preventDefault) {
				e.preventDefault();
			}

			this.setSelected(index, true);
		}
	},

	render: function () {
		var index = 0,
			children = [],
			list = this.props.children[0],
			panels = this.props.children.slice(1);

		// Clone TabList and Tab components to have refs
		children[0] = React.addons.cloneWithProps(list, {
			key: 'tablist',
			children: list.props.children.map(function (tab) {
				var key = 'tabs-' + (index++);
				return React.addons.cloneWithProps(tab, {
					ref: key,
					key: key
				});
			})
		});

		// Clone TabPanel components to have refs
		for (var i=0, l=panels.length; i<l; i++) {
			var key = 'panels-' + (i);
			children[i + 1] = React.addons.cloneWithProps(panels[i], {
								ref: key,
								key: key
							});
		}

		return (
			<div className="react-tabs"
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}>
				{children}
			</div>
		);
	}
});

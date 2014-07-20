/** @jsx React.DOM */
var React = require('react/addons');

function isTabNode(node) {
	return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

module.exports = React.createClass({
	propTypes: {
		selectedIndex: React.PropTypes.number,
		onSelect: React.PropTypes.func,
		focus: React.PropTypes.bool
	},

	getDefaultProps: function () {
		return {
			selectedIndex: 0,
			focus: false
		};
	},

	setSelected: function (index, focus) {
		// Don't do anything if nothing has changed
		if (index === this.props.selectedIndex) return;
		// Check index boundary
		if (index < 0 || index >= this.getTabs().length) return;

		var last = this.props.selectedIndex;

		// Update selected index
		//this.setProps({ selectedIndex: index, focus: focus === true });

		// This sucks but `setProps` is throwing error:
		// "You called `setProps` or `replaceProps` on a component with a parent."
		// This is only happening when coming from `handleClick` and `handleKeyDown`.
		// TODO: Figure out why `setProps` is causing problems.
		this.props.selectedIndex = index;
		this.props.focus = focus === true;
		this.forceUpdate();

		// Call change event handler
		if (typeof this.props.onSelect === 'function') {
			this.props.onSelect(index, last);
		}
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
		// Hook up relation between tabs and panels
		for (var i=0, l=this.getTabs().length; i<l; i++) {
			var tab = this.getTab(i),
				tabId = tab.getDOMNode().getAttribute('data-reactid'),
				panel = this.getPanel(i),
				panelId = panel.getDOMNode().getAttribute('data-reactid');

			// TODO: Again `setProps` is failing
			tab.props.id = tabId;
			tab.props.panelId = panelId;
			tab.forceUpdate();

			panel.props.id = panelId;
			panel.props.tabId = tabId;
			panel.forceUpdate();
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
			var index = this.props.selectedIndex,
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
			count = 0,
			children,
			props = this.props;

		// Map children to dynamically setup refs
		children = React.Children.map(this.props.children, function (child) {
			var result = null;

			// Clone TabList and Tab components to have refs
			if (count++ === 0) {
				result = React.addons.cloneWithProps(child, {
					children: React.Children.map(child.props.children, function (tab) {
						var ref = 'tabs-' + index,
							selected = props.selectedIndex === index,
							focus = selected && props.focus;

						index++;

						return React.addons.cloneWithProps(tab, {
							ref: ref,
							selected: selected,
							focus: focus
						});
					})
				});

				// Reset index for panels
				index = 0;
			}
			// Clone TabPanel components to have refs
			else {
				var ref = 'panels-' + index,
					selected = props.selectedIndex === index;

				index ++;

				result = React.addons.cloneWithProps(child, {
					ref: ref,
					selected: selected
				});
			}

			return result;
		});

		return (
			<div className="react-tabs"
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}>
				{children}
			</div>
		);
	}
});

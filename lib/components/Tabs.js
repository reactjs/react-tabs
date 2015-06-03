var React = require('react/addons');
var invariant = require('react/lib/invariant');
var jss = require('js-stylesheet');
var uuid = require('../helpers/uuid');

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
	return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

module.exports = React.createClass({
	displayName: 'Tabs',

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

	getInitialState: function () {
		var tabIds = [];
		var panelIds = [];

		// Setup tab/panel ids
		React.Children.forEach(this.props.children[0].props.children, function () {
			tabIds.push(uuid());
			panelIds.push(uuid());
		});

		return {
			selectedIndex: this.props.selectedIndex,
			focus: this.props.focus,
			tabIds: tabIds,
			panelIds: panelIds
		};
	},

	componentWillMount: function () {
		var tabsCount = this.getTabsCount();
		var panelsCount = this.getPanelsCount();

		invariant(
			tabsCount === panelsCount,
			'There should be an equal number of Tabs and TabPanels. ' +
			'Received %s Tabs and %s TabPanels.',
			tabsCount, panelsCount
		);

		jss(require('../helpers/styles.js'));
	},

	setSelected: function (index, focus) {
		// Don't do anything if nothing has changed
		if (index === this.state.selectedIndex) return;
		// Check index boundary
		if (index < 0 || index >= this.getTabsCount()) return;

		// Keep reference to last index for event handler
		var last = this.state.selectedIndex;

		// Update selected index
		this.setState({ selectedIndex: index, focus: focus === true });

		// Call change event handler
		if (typeof this.props.onSelect === 'function') {
			this.props.onSelect(index, last);
		}
	},

	getTabsCount: function () {
		return React.Children.count(this.props.children[0].props.children);
	},

	getPanelsCount: function () {
		return React.Children.count(this.props.children.slice(1));
	},

	getTabList: function () {
		return this.refs.tablist;
	},

	getTab: function (index) {
		return this.refs['tabs-' + index];
	},

	getPanel: function (index) {
		return this.refs['panels-' + index];
	},

	handleClick: function (e) {
		var node = e.target;
		do {
			if (isTabNode(node)) {
				var index = [].slice.call(node.parentNode.children).indexOf(node);
				this.setSelected(index);
				return;
			}
		} while (node = node.parentNode);
	},

	handleKeyDown: function (e) {
		if (isTabNode(e.target)) {
			var index = this.state.selectedIndex;
			var max = this.getTabsCount() - 1;
			var preventDefault = false;

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

  getChildren: function () {
    var index = 0;
		var count = 0;
		var children;
		var state = this.state;

    // Map children to dynamically setup refs
		return React.Children.map(this.props.children, function (child) {
			var result = null;

			// Clone TabList and Tab components to have refs
			if (count++ === 0) {
				result = React.addons.cloneWithProps(child, {
					ref: 'tablist',
					children: React.Children.map(child.props.children, function (tab) {
						var ref = 'tabs-' + index;
						var id = state.tabIds[index];
						var panelId = state.panelIds[index];
						var selected = state.selectedIndex === index;
						var focus = selected && state.focus;

						index++;

						return React.addons.cloneWithProps(tab, {
							ref: ref,
							id: id,
							panelId: panelId,
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
				var ref = 'panels-' + index;
				var id = state.panelIds[index];
				var tabId = state.tabIds[index];
				var selected = state.selectedIndex === index;

				index ++;

				result = React.addons.cloneWithProps(child, {
					ref: ref,
					id: id,
					tabId: tabId,
					selected: selected
				});
			}

			return result;
		});
  },

	render: function () {
    // This fixes an issue with focus management.
    // 
    // Ultimately, when focus is true, and an input has focus,
    // and any change on that input causes a state change/re-render,
    // focus gets sent back to the active tab, and input loses focus.
    //
    // Since the focus state only needs to be remembered
    // for the current render, we can reset it once the
    // render has happened.
    //
    // Don't use setState, because we don't want to re-render.
    //
    // See https://github.com/mzabriskie/react-tabs/pull/7
    if (this.state.focus) {
      setTimeout(function () {
        this.state.focus = false;
      }.bind(this), 0);
    }

		return React.DOM.div({
        className: 'react-tabs',
			  onClick: this.handleClick,
			  onKeyDown: this.handleKeyDown
      },
	  	this.getChildren()
		);
	}
});

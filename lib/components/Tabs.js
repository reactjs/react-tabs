var React = require('react/addons');
var jss = require('js-stylesheet');
var uuid = require('../helpers/uuid');
var childrenPropType = require('../helpers/childrenPropType');

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
	return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

module.exports = React.createClass({
	displayName: 'Tabs',

	propTypes: {
		selectedIndex: React.PropTypes.number,
		onSelect: React.PropTypes.func,
		focus: React.PropTypes.bool,
    children: childrenPropType
	},

	getDefaultProps: function () {
		return {
			selectedIndex: -1,
			focus: false
		};
	},

	getInitialState: function () {
	  return this.copyPropsToState(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this.copyPropsToState(newProps));
  },

	componentWillMount: function () {
    jss(require('../helpers/styles.js'));
	},

  // This is an anti-pattern, so sue me
  copyPropsToState: function (props) {
    var selectedIndex = props.selectedIndex;

    // If no selectedIndex prop was supplied, then try
    // preserving the existing selectedIndex from state.
    // If the state has not selectedIndex, default
    // to the first tab in the TabList.
    //
    // TODO: Need automation testing around this
    // Manual testing can be done using examples/focus
    // See 'should preserve selectedIndex when typing' in specs/Tabs.spec.js
    if (selectedIndex === -1) {
      if (this.state && this.state.selectedIndex) {
        selectedIndex = this.state.selectedIndex;
      } else {
        selectedIndex = 0;
      }
    }

    return {
      selectedIndex: selectedIndex,
      focus: props.focus
    };
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
		return this.props.children && this.props.children[0] ?
            React.Children.count(this.props.children[0].props.children) :
            0;
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
		var children = this.props.children;
		var state = this.state;
    var tabIds = this.tabIds = this.tabIds || [];
    var panelIds = this.panelIds = this.panelIds || [];
    var diff = this.tabIds.length - this.getTabsCount();
    
    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      tabIds.push(uuid());
      panelIds.push(uuid());
    }

    // Map children to dynamically setup refs
		return React.Children.map(children, function (child) {
			var result = null;

			// Clone TabList and Tab components to have refs
			if (count++ === 0) {
        // TODO try setting the uuid in the "constructor" for `Tab`/`TabPanel`
				result = React.addons.cloneWithProps(child, {
					ref: 'tablist',
					children: React.Children.map(child.props.children, function (tab) {
						var ref = 'tabs-' + index;
            var id = tabIds[index];
						var panelId = panelIds[index];
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
        var id = panelIds[index];
				var tabId = tabIds[index];
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

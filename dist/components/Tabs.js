'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jsStylesheet = require('js-stylesheet');

var _jsStylesheet2 = _interopRequireDefault(_jsStylesheet);

var _uuid = require('../helpers/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _childrenPropType = require('../helpers/childrenPropType');

var _childrenPropType2 = _interopRequireDefault(_childrenPropType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
  return node.getAttribute('aria-disabled') === 'true';
}

var useDefaultStyles = true;

module.exports = _react2.default.createClass({
  displayName: 'Tabs',

  propTypes: {
    className: _react.PropTypes.string,
    selectedIndex: _react.PropTypes.number,
    onSelect: _react.PropTypes.func,
    focus: _react.PropTypes.bool,
    children: _childrenPropType2.default,
    forceRenderTabPanel: _react.PropTypes.bool,
    tabPostfix: _react.PropTypes.string
  },

  childContextTypes: {
    forceRenderTabPanel: _react.PropTypes.bool
  },

  statics: {
    setUseDefaultStyles: function setUseDefaultStyles(use) {
      useDefaultStyles = use;
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      selectedIndex: -1,
      focus: false,
      forceRenderTabPanel: false
    };
  },
  getInitialState: function getInitialState() {
    return this.copyPropsToState(this.props);
  },
  getChildContext: function getChildContext() {
    return {
      forceRenderTabPanel: this.props.forceRenderTabPanel
    };
  },
  componentDidMount: function componentDidMount() {
    if (useDefaultStyles) {
      (0, _jsStylesheet2.default)(require('../helpers/styles.js'));
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState(this.copyPropsToState(newProps));
  },
  handleClick: function handleClick(e) {
    var node = e.target;
    do {
      if (isTabNode(node)) {
        if (isTabDisabled(node)) {
          return;
        }

        var index = [].slice.call(node.parentNode.children).indexOf(node);
        this.setSelected(index);
        return;
      }
    } while ((node = node.parentNode) !== null);
  },
  handleKeyDown: function handleKeyDown(e) {
    if (isTabNode(e.target)) {
      var index = this.state.selectedIndex;
      var preventDefault = false;

      // Select next tab to the left
      if (e.keyCode === 37 || e.keyCode === 38) {
        index = this.getPrevTab(index);
        preventDefault = true;
      }
      // Select next tab to the right
      /* eslint brace-style:0 */
      else if (e.keyCode === 39 || e.keyCode === 40) {
          index = this.getNextTab(index);
          preventDefault = true;
        }

      // This prevents scrollbars from moving around
      if (preventDefault) {
        e.preventDefault();
      }

      this.setSelected(index, true);
    }
  },
  setSelected: function setSelected(index, focus) {
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
  getNextTab: function getNextTab(index) {
    var count = this.getTabsCount();

    // Look for non-disabled tab from index to the last tab on the right
    for (var i = index + 1; i < count; i++) {
      var tab = this.getTab(i);
      if (!isTabDisabled((0, _reactDom.findDOMNode)(tab))) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (var _i = 0; _i < index; _i++) {
      var _tab = this.getTab(_i);
      if (!isTabDisabled((0, _reactDom.findDOMNode)(_tab))) {
        return _i;
      }
    }

    // No tabs are disabled, return index
    return index;
  },
  getPrevTab: function getPrevTab(index) {
    var i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      var tab = this.getTab(i);
      if (!isTabDisabled((0, _reactDom.findDOMNode)(tab))) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.getTabsCount();
    while (i-- > index) {
      var _tab2 = this.getTab(i);
      if (!isTabDisabled((0, _reactDom.findDOMNode)(_tab2))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  },
  getTabsCount: function getTabsCount() {
    return this.props.children && this.props.children[0] ? _react2.default.Children.count(this.props.children[0].props.children) : 0;
  },
  getPanelsCount: function getPanelsCount() {
    return _react2.default.Children.count(this.props.children.slice(1));
  },
  getTabList: function getTabList() {
    return this.refs.tablist;
  },
  getTab: function getTab(index) {
    return this.refs['tabs-' + index];
  },
  getPanel: function getPanel(index) {
    return this.refs['panels-' + index];
  },
  getChildren: function getChildren() {
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
      tabIds.push((0, _uuid2.default)(state.tabPostfix));
      panelIds.push((0, _uuid2.default)(state.tabPostfix));
    }

    // Map children to dynamically setup refs
    return _react2.default.Children.map(children, function (child) {
      // null happens when conditionally rendering TabPanel/Tab
      // see https://github.com/rackt/react-tabs/issues/37
      if (child === null) {
        return null;
      }

      var result = null;

      // Clone TabList and Tab components to have refs
      if (count++ === 0) {
        // TODO try setting the uuid in the "constructor" for `Tab`/`TabPanel`
        result = (0, _react.cloneElement)(child, {
          ref: 'tablist',
          children: _react2.default.Children.map(child.props.children, function (tab) {
            // null happens when conditionally rendering TabPanel/Tab
            // see https://github.com/rackt/react-tabs/issues/37
            if (tab === null) {
              return null;
            }

            var ref = 'tabs-' + index;
            var id = tabIds[index];
            var panelId = panelIds[index];
            var selected = state.selectedIndex === index;
            var focus = selected && state.focus;

            index++;

            return (0, _react.cloneElement)(tab, {
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

          index++;

          result = (0, _react.cloneElement)(child, {
            ref: ref,
            id: id,
            tabId: tabId,
            selected: selected
          });
        }

      return result;
    });
  },
  render: function render() {
    var _this = this;

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
    // See https://github.com/rackt/react-tabs/pull/7
    if (this.state.focus) {
      setTimeout(function () {
        _this.state.focus = false;
      }, 0);
    }

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('ReactTabs', 'react-tabs', this.props.className),
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown
      },
      this.getChildren()
    );
  },


  // This is an anti-pattern, so sue me
  copyPropsToState: function copyPropsToState(props) {
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
  }
});
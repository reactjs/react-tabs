'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tab = require('../components/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = require('../components/TabList');

var _TabList2 = _interopRequireDefault(_TabList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function childrenPropTypes(props, propName) {
  var error = void 0;
  var tabsCount = 0;
  var panelsCount = 0;
  var children = props[propName];

  _react2.default.Children.forEach(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/rackt/react-tabs/issues/37
    if (child === null) {
      return;
    }

    if (child.type === _TabList2.default) {
      _react2.default.Children.forEach(child.props.children, function (c) {
        // null happens when conditionally rendering TabPanel/Tab
        // see https://github.com/rackt/react-tabs/issues/37
        if (c === null) {
          return;
        }

        if (c.type === _Tab2.default) {
          tabsCount++;
        } else {
          error = new Error('Expected `Tab` but found `' + (c.type.displayName || c.type) + '`');
        }
      });
    } else if (child.type.displayName === 'TabPanel') {
      panelsCount++;
    } else {
      error = new Error('Expected `TabList` or `TabPanel` but found `' + (child.type.displayName || child.type) + '`');
    }
  });

  if (tabsCount !== panelsCount) {
    error = new Error('There should be an equal number of `Tabs` and `TabPanels`. ' + 'Received ' + tabsCount + ' `Tabs` and ' + panelsCount + ' `TabPanels`.');
  }

  return error;
};
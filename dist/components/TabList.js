'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
  displayName: 'TabList',

  propTypes: {
    className: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array])
  },

  render: function render() {
    return _react2.default.createElement(
      'ul',
      {
        className: (0, _classnames2.default)('ReactTabs__TabList', this.props.className),
        role: 'tablist'
      },
      this.props.children
    );
  }
});
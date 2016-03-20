'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
  displayName: 'TabPanel',

  propTypes: {
    className: _react.PropTypes.string,
    selected: _react.PropTypes.bool,
    id: _react.PropTypes.string,
    tabId: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string])
  },

  contextTypes: {
    forceRenderTabPanel: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      selected: false,
      id: null,
      tabId: null
    };
  },
  render: function render() {
    var children = this.context.forceRenderTabPanel || this.props.selected ? this.props.children : null;

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('ReactTabs__TabPanel', this.props.className, {
          'ReactTabs__TabPanel--selected': this.props.selected
        }),
        role: 'tabpanel',
        id: this.props.id,
        'aria-labelledby': this.props.tabId,
        style: { display: this.props.selected ? null : 'none' }
      },
      children
    );
  }
});
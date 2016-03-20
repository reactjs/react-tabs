'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function syncNodeAttributes(node, props) {
  if (props.selected) {
    node.setAttribute('tabindex', 0);
    node.setAttribute('selected', 'selected');
    if (props.focus) {
      node.focus();
    }
  } else {
    node.removeAttribute('tabindex');
    node.removeAttribute('selected');
  }
}

module.exports = _react2.default.createClass({
  displayName: 'Tab',

  propTypes: {
    className: _react.PropTypes.string,
    id: _react.PropTypes.string,
    selected: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    panelId: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      focus: false,
      selected: false,
      id: null,
      panelId: null
    };
  },
  componentDidMount: function componentDidMount() {
    syncNodeAttributes((0, _reactDom.findDOMNode)(this), this.props);
  },
  componentDidUpdate: function componentDidUpdate() {
    syncNodeAttributes((0, _reactDom.findDOMNode)(this), this.props);
  },
  render: function render() {
    return _react2.default.createElement(
      'li',
      {
        className: (0, _classnames2.default)('ReactTabs__Tab', this.props.className, {
          'ReactTabs__Tab--selected': this.props.selected,
          'ReactTabs__Tab--disabled': this.props.disabled
        }),
        role: 'tab',
        id: this.props.id,
        'aria-selected': this.props.selected ? 'true' : 'false',
        'aria-expanded': this.props.selected ? 'true' : 'false',
        'aria-disabled': this.props.disabled ? 'true' : 'false',
        'aria-controls': this.props.panelId
      },
      this.props.children
    );
  }
});
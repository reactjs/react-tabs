'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _main = require('../../main');

var _assert = require('assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint func-names:0 */
describe('Tab', function () {
  it('should have sane defaults', function () {
    var tabPanel = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      _main.TabPanel,
      null,
      'Hola'
    ));
    var node = (0, _reactDom.findDOMNode)(tabPanel);

    (0, _assert.equal)(node.className, 'ReactTabs__TabPanel');
    (0, _assert.equal)(node.getAttribute('role'), 'tabpanel');
    (0, _assert.equal)(node.getAttribute('aria-labelledby'), null);
    (0, _assert.equal)(node.getAttribute('id'), null);
    (0, _assert.equal)(node.innerHTML, '');
    (0, _assert.equal)(node.style.display, 'none');
  });

  it('should accept className', function () {
    var tabPanel = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_main.TabPanel, { className: 'foobar' }));
    var node = (0, _reactDom.findDOMNode)(tabPanel);

    (0, _assert.equal)(node.className, 'ReactTabs__TabPanel foobar');
  });

  it('should support being selected', function () {
    var tabPanel = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      _main.TabPanel,
      { selected: true, id: 'abcd', tabId: '1234' },
      'Hola'
    ));
    var node = (0, _reactDom.findDOMNode)(tabPanel);

    (0, _assert.equal)(node.className, 'ReactTabs__TabPanel ReactTabs__TabPanel--selected');
    (0, _assert.equal)(node.getAttribute('aria-labelledby'), '1234');
    (0, _assert.equal)(node.getAttribute('id'), 'abcd');
    (0, _assert.equal)(node.innerHTML, 'Hola');
    (0, _assert.equal)(node.style.display, '');
  });
});
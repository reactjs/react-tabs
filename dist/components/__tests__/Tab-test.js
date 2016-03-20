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
    var tab = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_main.Tab, null));
    var node = (0, _reactDom.findDOMNode)(tab);

    (0, _assert.equal)(node.className, 'ReactTabs__Tab');
    (0, _assert.equal)(node.getAttribute('role'), 'tab');
    (0, _assert.equal)(node.getAttribute('aria-selected'), 'false');
    (0, _assert.equal)(node.getAttribute('aria-expanded'), 'false');
    (0, _assert.equal)(node.getAttribute('aria-disabled'), 'false');
    (0, _assert.equal)(node.getAttribute('aria-controls'), null);
    (0, _assert.equal)(node.getAttribute('id'), null);
    (0, _assert.equal)(node.innerHTML, '');
  });

  it('should accept className', function () {
    var tab = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_main.Tab, { className: 'foobar' }));
    var node = (0, _reactDom.findDOMNode)(tab);

    (0, _assert.equal)(node.className, 'ReactTabs__Tab foobar');
  });

  it('should support being selected', function () {
    var tab = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      _main.Tab,
      { selected: true, id: 'abcd', panelId: '1234' },
      'Hello'
    ));
    var node = (0, _reactDom.findDOMNode)(tab);

    (0, _assert.equal)(node.className, 'ReactTabs__Tab ReactTabs__Tab--selected');
    (0, _assert.equal)(node.getAttribute('aria-selected'), 'true');
    (0, _assert.equal)(node.getAttribute('aria-expanded'), 'true');
    (0, _assert.equal)(node.getAttribute('aria-controls'), '1234');
    (0, _assert.equal)(node.getAttribute('id'), 'abcd');
    (0, _assert.equal)(node.innerHTML, 'Hello');
  });

  it('should support being disabled', function () {
    var tab = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_main.Tab, { disabled: true }));
    var node = (0, _reactDom.findDOMNode)(tab);

    (0, _assert.equal)(node.className, 'ReactTabs__Tab ReactTabs__Tab--disabled');
  });
});
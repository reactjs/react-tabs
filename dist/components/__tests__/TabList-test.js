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
    var tabList = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_main.TabList, null));
    var node = (0, _reactDom.findDOMNode)(tabList);

    (0, _assert.equal)(node.className, 'ReactTabs__TabList');
    (0, _assert.equal)(node.getAttribute('role'), 'tablist');
  });

  it('should accept className', function () {
    var tabList = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_main.TabList, { className: 'foobar' }));
    var node = (0, _reactDom.findDOMNode)(tabList);

    (0, _assert.equal)(node.className, 'ReactTabs__TabList foobar');
  });
});
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _main = require('../../main');

var _assert = require('assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTabs() {
  var props = arguments.length <= 0 || arguments[0] === undefined ? {
    selectedIndex: 0,
    focus: false,
    onSelect: null,
    forceRenderTabPanel: false,
    className: null
  } : arguments[0];

  return _react2.default.createElement(
    _main.Tabs,
    props,
    _react2.default.createElement(
      _main.TabList,
      null,
      _react2.default.createElement(
        _main.Tab,
        null,
        'Foo'
      ),
      _react2.default.createElement(
        _main.Tab,
        null,
        'Bar'
      ),
      _react2.default.createElement(
        _main.Tab,
        null,
        _react2.default.createElement(
          'a',
          null,
          'Baz'
        )
      ),
      _react2.default.createElement(
        _main.Tab,
        { disabled: true },
        'Qux'
      )
    ),
    _react2.default.createElement(
      _main.TabPanel,
      null,
      'Hello Foo'
    ),
    _react2.default.createElement(
      _main.TabPanel,
      null,
      'Hello Bar'
    ),
    _react2.default.createElement(
      _main.TabPanel,
      null,
      'Hello Baz'
    ),
    _react2.default.createElement(
      _main.TabPanel,
      null,
      'Hello Qux'
    )
  );
}

function assertTabSelected(tabs, index) {
  (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getTab(index)).getAttribute('tabindex'), '0');
  (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getTab(index)).getAttribute('selected'), 'selected');
  (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getTab(index)).getAttribute('aria-selected'), 'true');
  (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getTab(index)).getAttribute('aria-expanded'), 'true');
  (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(index)).style.display, '');
}

/* eslint func-names:0 */
describe('react-tabs', function () {
  describe('props', function () {
    it('should default to selectedIndex being 0', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs());

      assertTabSelected(tabs, 0);
    });

    it('should honor selectedIndex prop', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs({ selectedIndex: 1 }));

      assertTabSelected(tabs, 1);
    });

    it('should call onSelect when selection changes', function () {
      var called = { index: -1, last: -1 };
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs({
        onSelect: function onSelect(index, last) {
          called.index = index;
          called.last = last;
        }
      }));

      tabs.setSelected(2);
      (0, _assert.equal)(called.index, 2);
      (0, _assert.equal)(called.last, 0);
    });

    it('should have a default className', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs());
      var node = (0, _reactDom.findDOMNode)(tabs);

      (0, _assert.equal)(node.className, 'ReactTabs react-tabs');
    });

    it('should accept className', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs({ className: 'foobar' }));
      var node = (0, _reactDom.findDOMNode)(tabs);

      (0, _assert.equal)(node.className, 'ReactTabs react-tabs foobar');
    });
  });

  describe('a11y', function () {
    it('should have appropriate role and aria attributes', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs());

      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getTabList()).getAttribute('role'), 'tablist');

      for (var i = 0, l = tabs.getTabsCount(); i < l; i++) {
        var tab = (0, _reactDom.findDOMNode)(tabs.getTab(i));
        var panel = (0, _reactDom.findDOMNode)(tabs.getPanel(i));

        (0, _assert.equal)(tab.getAttribute('role'), 'tab');
        (0, _assert.equal)(panel.getAttribute('role'), 'tabpanel');

        (0, _assert.equal)(tab.getAttribute('aria-controls'), panel.getAttribute('id'));
        (0, _assert.equal)(panel.getAttribute('aria-labelledby'), tab.getAttribute('id'));
      }

      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getTab(3)).getAttribute('aria-disabled'), 'true');
    });
  });

  describe('interaction', function () {
    it('should update selectedIndex when clicked', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs());

      _reactAddonsTestUtils2.default.Simulate.click((0, _reactDom.findDOMNode)(tabs.getTab(1)));
      assertTabSelected(tabs, 1);
    });

    it('should update selectedIndex when tab child is clicked', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs());

      _reactAddonsTestUtils2.default.Simulate.click((0, _reactDom.findDOMNode)(tabs.getTab(2)).firstChild);
      assertTabSelected(tabs, 2);
    });

    it('should not change selectedIndex when clicking a disabled tab', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs({ selectedIndex: 0 }));

      _reactAddonsTestUtils2.default.Simulate.click((0, _reactDom.findDOMNode)(tabs.getTab(3)));
      assertTabSelected(tabs, 0);
    });

    // TODO: Can't seem to make this fail when removing fix :`(
    // See https://github.com/rackt/react-tabs/pull/7
    // it('should preserve selectedIndex when typing', function () {
    //   let App = React.createClass({
    //     handleKeyDown: function () { this.forceUpdate(); },
    //     render: function () {
    //       return (
    //         <Tabs ref="tabs" selectedIndex={1}>
    //           <TabList>
    //             <Tab>First</Tab>
    //             <Tab>Second</Tab>
    //           </TabList>
    //           <TabPanel>1st</TabPanel>
    //           <TabPanel><input onKeyDown={this.handleKeyDown}/></TabPanel>
    //         </Tabs>
    //       );
    //     }
    //   });
    //
    //   let tabs = TestUtils.renderIntoDocument(<App/>).refs.tabs;
    //   let input = tabs.getDOMNode().querySelector('input');
    //
    //   input.focus();
    //   TestUtils.Simulate.keyDown(input, {
    //     keyCode: 'a'.charCodeAt()
    //   });
    //
    //   assertTabSelected(tabs, 1);
    // });
  });

  describe('performance', function () {
    it('should only render the active tab panel', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs());

      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(0)).innerHTML, 'Hello Foo');
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(1)).innerHTML, '');
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(2)).innerHTML, '');

      _reactAddonsTestUtils2.default.Simulate.click((0, _reactDom.findDOMNode)(tabs.getTab(1)));
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(0)).innerHTML, '');
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(1)).innerHTML, 'Hello Bar');
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(2)).innerHTML, '');

      _reactAddonsTestUtils2.default.Simulate.click((0, _reactDom.findDOMNode)(tabs.getTab(2)));
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(0)).innerHTML, '');
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(1)).innerHTML, '');
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(2)).innerHTML, 'Hello Baz');
    });

    it('should render all tabs if forceRenderTabPanel is true', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(createTabs({ forceRenderTabPanel: true }));
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(0)).innerHTML, 'Hello Foo');
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(1)).innerHTML, 'Hello Bar');
      (0, _assert.equal)((0, _reactDom.findDOMNode)(tabs.getPanel(2)).innerHTML, 'Hello Baz');
    });
  });

  describe('validation', function () {
    it('should result with warning when tabs/panels are imbalanced', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        _main.Tabs,
        null,
        _react2.default.createElement(
          _main.TabList,
          null,
          _react2.default.createElement(
            _main.Tab,
            null,
            'Foo'
          )
        )
      ));

      var result = _main.Tabs.propTypes.children(tabs.props, 'children', 'Tabs');
      (0, _assert.ok)(result instanceof Error);
    });

    it('should result with a warning when wrong element is found', function () {
      var tabs = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        _main.Tabs,
        null,
        _react2.default.createElement(
          _main.TabList,
          null,
          _react2.default.createElement(_main.Tab, null),
          _react2.default.createElement('div', null)
        ),
        _react2.default.createElement(_main.TabPanel, null)
      ));

      var result = _main.Tabs.propTypes.children(tabs.props, 'children', 'Tabs');
      (0, _assert.ok)(result instanceof Error);
    });

    it('should be okay with rendering without any children', function () {
      var error = false;
      try {
        _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_main.Tabs, null));
      } catch (e) {
        error = true;
      }

      (0, _assert.ok)(!error);
    });

    it('should be okay with rendering just TabList', function () {
      var error = false;
      try {
        _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
          _main.Tabs,
          null,
          _react2.default.createElement(_main.TabList, null)
        ));
      } catch (e) {
        error = true;
      }

      (0, _assert.ok)(!error);
    });

    it('should gracefully render null', function () {
      var error = false;
      try {
        _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
          _main.Tabs,
          null,
          _react2.default.createElement(
            _main.TabList,
            null,
            _react2.default.createElement(
              _main.Tab,
              null,
              'Tab A'
            ),
            false && _react2.default.createElement(
              _main.Tab,
              null,
              'Tab B'
            )
          ),
          _react2.default.createElement(
            _main.TabPanel,
            null,
            'Content A'
          ),
          false && _react2.default.createElement(
            _main.TabPanel,
            null,
            'Content B'
          )
        ));
      } catch (e) {
        error = true;
      }

      (0, _assert.ok)(!error);
    });
  });
});
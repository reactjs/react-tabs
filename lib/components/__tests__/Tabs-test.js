import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Tabs, Tab, TabPanel, TabList } from '../../main';
import { ok, equal } from 'assert';

function createTabs(props = {
  selectedIndex: 0,
  focus: false,
  onSelect: null,
  forceRenderTabPanel: false,
  className: null
}) {
  return (
    <Tabs {...props}>
      <TabList>
        <Tab>Foo</Tab>
        <Tab>Bar</Tab>
        <Tab><a>Baz</a></Tab>
        <Tab disabled>Qux</Tab>
      </TabList>
      <TabPanel>Hello Foo</TabPanel>
      <TabPanel>Hello Bar</TabPanel>
      <TabPanel>Hello Baz</TabPanel>
      <TabPanel>Hello Qux</TabPanel>
    </Tabs>
  );
}

function assertTabSelected(tabs, index) {
  equal(findDOMNode(tabs.getTab(index)).getAttribute('tabindex'), '0');
  equal(findDOMNode(tabs.getTab(index)).getAttribute('selected'), 'selected');
  equal(findDOMNode(tabs.getTab(index)).getAttribute('aria-selected'), 'true');
  equal(findDOMNode(tabs.getTab(index)).getAttribute('aria-expanded'), 'true');
  equal(findDOMNode(tabs.getPanel(index)).style.display, '');
}

/* eslint func-names:0 */
describe('react-tabs', function() {
  describe('props', function() {
    it('should default to selectedIndex being 0', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs());

      assertTabSelected(tabs, 0);
    });

    it('should honor selectedIndex prop', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs({selectedIndex: 1}));

      assertTabSelected(tabs, 1);
    });

    it('should call onSelect when selection changes', function() {
      const called = {index: -1, last: -1};
      const tabs = TestUtils.renderIntoDocument(createTabs({
        onSelect: function(index, last) {
          called.index = index;
          called.last = last;
        }
      }));

      tabs.setSelected(2);
      equal(called.index, 2);
      equal(called.last, 0);
    });

    it('should have a default className', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs());
      const node = findDOMNode(tabs);

      equal(node.className, 'ReactTabs react-tabs');
    });

    it('should accept className', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs({className: 'foobar'}));
      const node = findDOMNode(tabs);

      equal(node.className, 'ReactTabs react-tabs foobar');
    });
  });

  describe('a11y', function() {
    it('should have appropriate role and aria attributes', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs());

      equal(findDOMNode(tabs.getTabList()).getAttribute('role'), 'tablist');

      for (let i = 0, l = tabs.getTabsCount(); i < l; i++) {
        const tab = findDOMNode(tabs.getTab(i));
        const panel = findDOMNode(tabs.getPanel(i));

        equal(tab.getAttribute('role'), 'tab');
        equal(panel.getAttribute('role'), 'tabpanel');

        equal(tab.getAttribute('aria-controls'), panel.getAttribute('id'));
        equal(panel.getAttribute('aria-labelledby'), tab.getAttribute('id'));
      }

      equal(findDOMNode(tabs.getTab(3)).getAttribute('aria-disabled'), 'true');
    });
  });

  describe('interaction', function() {
    it('should update selectedIndex when clicked', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs());

      TestUtils.Simulate.click(findDOMNode(tabs.getTab(1)));
      assertTabSelected(tabs, 1);
    });

    it('should update selectedIndex when tab child is clicked', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs());

      TestUtils.Simulate.click(findDOMNode(tabs.getTab(2)).firstChild);
      assertTabSelected(tabs, 2);
    });

    it('should not change selectedIndex when clicking a disabled tab', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs({selectedIndex: 0}));

      TestUtils.Simulate.click(findDOMNode(tabs.getTab(3)));
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

  describe('performance', function() {
    it('should only render the active tab panel', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs());

      equal(findDOMNode(tabs.getPanel(0)).innerHTML, 'Hello Foo');
      equal(findDOMNode(tabs.getPanel(1)).innerHTML, '');
      equal(findDOMNode(tabs.getPanel(2)).innerHTML, '');

      TestUtils.Simulate.click(findDOMNode(tabs.getTab(1)));
      equal(findDOMNode(tabs.getPanel(0)).innerHTML, '');
      equal(findDOMNode(tabs.getPanel(1)).innerHTML, 'Hello Bar');
      equal(findDOMNode(tabs.getPanel(2)).innerHTML, '');

      TestUtils.Simulate.click(findDOMNode(tabs.getTab(2)));
      equal(findDOMNode(tabs.getPanel(0)).innerHTML, '');
      equal(findDOMNode(tabs.getPanel(1)).innerHTML, '');
      equal(findDOMNode(tabs.getPanel(2)).innerHTML, 'Hello Baz');
    });

    it('should render all tabs if forceRenderTabPanel is true', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs({forceRenderTabPanel: true}));
      equal(findDOMNode(tabs.getPanel(0)).innerHTML, 'Hello Foo');
      equal(findDOMNode(tabs.getPanel(1)).innerHTML, 'Hello Bar');
      equal(findDOMNode(tabs.getPanel(2)).innerHTML, 'Hello Baz');
    });
  });

  describe('validation', function() {
    it('should result with warning when tabs/panels are imbalanced', function() {
      const tabs = TestUtils.renderIntoDocument(
        <Tabs>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
        </Tabs>
      );

      const result = Tabs.propTypes.children(tabs.props, 'children', 'Tabs');
      ok(result instanceof Error);
    });

    it('should result with a warning when wrong element is found', function() {
      const tabs = TestUtils.renderIntoDocument(
        <Tabs>
          <TabList>
            <Tab/>
            <div/>
          </TabList>
          <TabPanel/>
        </Tabs>
      );

      const result = Tabs.propTypes.children(tabs.props, 'children', 'Tabs');
      ok(result instanceof Error);
    });

    it('should be okay with rendering without any children', function() {
      let error = false;
      try {
        TestUtils.renderIntoDocument(
          <Tabs/>
        );
      } catch (e) {
        error = true;
      }

      ok(!error);
    });

    it('should be okay with rendering just TabList', function() {
      let error = false;
      try {
        TestUtils.renderIntoDocument(
          <Tabs>
            <TabList/>
          </Tabs>
        );
      } catch (e) {
        error = true;
      }

      ok(!error);
    });

    it('should gracefully render null', function() {
      let error = false;
      try {
        TestUtils.renderIntoDocument(
          <Tabs>
            <TabList>
              <Tab>Tab A</Tab>
              { false && <Tab>Tab B</Tab> }
            </TabList>
            <TabPanel>Content A</TabPanel>
            { false && <TabPanel>Content B</TabPanel> }
          </Tabs>
        );
      } catch (e) {
        error = true;
      }

      ok(!error);
    });
  });
});

import React from 'react/addons';
import { Tabs, Tab, TabPanel, TabList } from '../../main';
import { ok, equal } from 'assert';
const TestUtils = React.addons.TestUtils;

function createTabs(props = {}) {
  props.selectedIndex = props.selectedIndex || 0;
  props.focus = props.focus || false;
  props.onSelect = props.onSelect || null;

  return (
    <Tabs focus={props.focus} selectedIndex={props.selectedIndex} onSelect={props.onSelect}>
      <TabList>
        <Tab>Foo</Tab>
        <Tab>Bar</Tab>
        <Tab><a>Baz</a></Tab>
      </TabList>
      <TabPanel>Hello Foo</TabPanel>
      <TabPanel>Hello Bar</TabPanel>
      <TabPanel>Hello Baz</TabPanel>
    </Tabs>
  );
}

function assertTabSelected(tabs, index) {
  equal(tabs.getTab(index).getDOMNode().getAttribute('tabindex'), '0');
  equal(tabs.getTab(index).getDOMNode().getAttribute('selected'), 'selected');
  equal(tabs.getTab(index).getDOMNode().getAttribute('aria-selected'), 'true');
  equal(tabs.getTab(index).getDOMNode().getAttribute('aria-expanded'), 'true');
  equal(tabs.getPanel(index).getDOMNode().style.display, '');
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
      const tabs = TestUtils.renderIntoDocument(createTabs({onSelect: function(index, last) {
        called.index = index;
        called.last = last;
      }}));

      tabs.setSelected(2);
      equal(called.index, 2);
      equal(called.last, 0);
    });
  });

  describe('a11y', function() {
    it('should have appropriate role and aria attributes', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs());

      equal(tabs.getTabList().getDOMNode().getAttribute('role'), 'tablist');

      for (let i = 0, l = tabs.getTabsCount(); i < l; i++) {
        const tab = tabs.getTab(i).getDOMNode();
        const panel = tabs.getPanel(i).getDOMNode();

        equal(tab.getAttribute('role'), 'tab');
        equal(panel.getAttribute('role'), 'tabpanel');

        equal(tab.getAttribute('aria-controls'), panel.getAttribute('id'));
        equal(panel.getAttribute('aria-labeledby'), tab.getAttribute('id'));
      }
    });
  });

  describe('interaction', function() {
    it('should update selectedIndex when clicked', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs());

      TestUtils.Simulate.click(tabs.getTab(1).getDOMNode());
      assertTabSelected(tabs, 1);
    });

    it('should update selectedIndex when tab child is clicked', function() {
      const tabs = TestUtils.renderIntoDocument(createTabs());

      TestUtils.Simulate.click(tabs.getTab(2).getDOMNode().firstChild);
      assertTabSelected(tabs, 2);
    });

    // TODO: Can't seem to make this fail when removing fix :`(
    // See https://github.com/mzabriskie/react-tabs/pull/7
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

      equal(tabs.getPanel(0).getDOMNode().innerHTML, 'Hello Foo');
      equal(tabs.getPanel(1).getDOMNode().innerHTML, '');
      equal(tabs.getPanel(2).getDOMNode().innerHTML, '');

      TestUtils.Simulate.click(tabs.getTab(1).getDOMNode());
      equal(tabs.getPanel(0).getDOMNode().innerHTML, '');
      equal(tabs.getPanel(1).getDOMNode().innerHTML, 'Hello Bar');
      equal(tabs.getPanel(2).getDOMNode().innerHTML, '');

      TestUtils.Simulate.click(tabs.getTab(2).getDOMNode());
      equal(tabs.getPanel(0).getDOMNode().innerHTML, '');
      equal(tabs.getPanel(1).getDOMNode().innerHTML, '');
      equal(tabs.getPanel(2).getDOMNode().innerHTML, 'Hello Baz');
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
  });
});

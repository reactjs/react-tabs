/** @jsx React.DOM */

require('./helper');

function createTabs(props) {
  props = props || {};
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
  equal(tabs.state.selectedIndex, index);
  equal(tabs.getTab(index).getDOMNode().getAttribute('tabindex'), '0');
  equal(tabs.getTab(index).getDOMNode().getAttribute('selected'), 'selected');
  equal(tabs.getTab(index).getDOMNode().getAttribute('aria-selected'), 'true');
  equal(tabs.getTab(index).getDOMNode().getAttribute('aria-expanded'), 'true');
  equal(tabs.getPanel(index).getDOMNode().style.display, '');
}

describe('react-tabs', function () {
  describe('props', function () {
    it('should default to selectedIndex being 0', function () {
      var tabs = TestUtils.renderIntoDocument(createTabs());

      assertTabSelected(tabs, 0);
    });

    it('should honor selectedIndex prop', function () {
      var tabs = TestUtils.renderIntoDocument(createTabs({selectedIndex: 1}));

      assertTabSelected(tabs, 1);
    });

    it('should call onSelect when selection changes', function () {
      var called = {index: -1, last: -1},
      tabs = TestUtils.renderIntoDocument(createTabs({onSelect: function (index, last) {
        called.index = index;
        called.last = last;
      }}));

      tabs.setSelected(2);
      equal(called.index, 2);
      equal(called.last, 0);
    });
  });

  describe('a11y', function () {
    it('should have appropriate role and aria attributes', function () {
      var tabs = TestUtils.renderIntoDocument(createTabs());

      equal(tabs.getTabList().getDOMNode().getAttribute('role'), 'tablist');

      for (var i=0, l=tabs.getTabsCount(); i<l; i++) {
        var tab = tabs.getTab(i).getDOMNode(),
        panel = tabs.getPanel(i).getDOMNode();

        equal(tab.getAttribute('role'), 'tab');
        equal(panel.getAttribute('role'), 'tabpanel');

        equal(tab.getAttribute('aria-controls'), panel.getAttribute('id'));
        equal(panel.getAttribute('aria-labeledby'), tab.getAttribute('id'));
      }
    });
  });

  describe('interaction', function () {
    it('should update selectedIndex when clicked', function () {
      var tabs = TestUtils.renderIntoDocument(createTabs());

      TestUtils.Simulate.click(tabs.getTab(1).getDOMNode());
      assertTabSelected(tabs, 1);
    });
    it('should update selectedIndex when tab child is clicked', function () {
      var tabs = TestUtils.renderIntoDocument(createTabs());

      TestUtils.Simulate.click(tabs.getTab(2).getDOMNode().firstChild);
      assertTabSelected(tabs, 2);
    });
  });

  describe('validation', function () {
    it('should result with invariant when tabs/panels are imbalanced', function () {
      var tabs = (
        <Tabs>
        <TabList>
        <Tab>Foo</Tab>
        </TabList>
        </Tabs>
      );

      var error = false;
      try {
        TestUtils.renderIntoDocument(tabs);
      } catch (e) {
        error = true;
      }

      ok(error);
    });
  });
});

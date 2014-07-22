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
				<Tab>Baz</Tab>
			</TabList>
			<TabPanel>Hello Foo</TabPanel>
			<TabPanel>Hello Bar</TabPanel>
			<TabPanel>Hello Baz</TabPanel>
		</Tabs>
	);
}

function assertTabSelected(tabs, index) {
	expect(tabs.state.selectedIndex).toEqual(index);
	expect(tabs.getTab(index).getDOMNode().getAttribute('tabindex')).toEqual('0');
	expect(tabs.getTab(index).getDOMNode().getAttribute('selected')).toEqual('selected');
	expect(tabs.getTab(index).getDOMNode().getAttribute('aria-selected')).toEqual('true');
	expect(tabs.getTab(index).getDOMNode().getAttribute('aria-expanded')).toEqual('true');
	expect(tabs.getPanel(index).getDOMNode().style.display).toEqual('');
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
			expect(called.index).toEqual(2);
			expect(called.last).toEqual(0);
		});
	});

	describe('a11y', function () {
		it('should have appropriate role and aria attributes', function () {
			var tabs = TestUtils.renderIntoDocument(createTabs());

			expect(tabs.getTabList().getDOMNode().getAttribute('role')).toEqual('tablist');

			for (var i=0, l=tabs.getTabsCount(); i<l; i++) {
				var tab = tabs.getTab(i).getDOMNode(),
					panel = tabs.getPanel(i).getDOMNode();

				expect(tab.getAttribute('role')).toEqual('tab');
				expect(panel.getAttribute('role')).toEqual('tabpanel');

				expect(tab.getAttribute('aria-controls')).toEqual(panel.getAttribute('id'));
				expect(panel.getAttribute('aria-labeledby')).toEqual(tab.getAttribute('id'));
			}
		});
	});

	describe('interaction', function () {
		it('should update selectedIndex when clicked', function () {
			var tabs = TestUtils.renderIntoDocument(createTabs());

			TestUtils.Simulate.click(tabs.getTab(1).getDOMNode());
			assertTabSelected(tabs, 1);
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

			expect(error).toEqual(true);
		});
	});
});

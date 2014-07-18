/** @jsx React.DOM */

require('./helper');

describe('react-tabs', function () {
	it('create tabs', function () {
		var tabs = (
			<Tabs>
				<TabList>
					<Tab>Foo</Tab>
				</TabList>
				<TabPanel>
					<h2>Foo</h2>
				</TabPanel>
			</Tabs>
		);

		// TODO: Need to fix some warnings for this to work
		// See this fiddle for details - http://jsfiddle.net/mzabriskie/7v39Q/3/
		// var component = TestUtils.renderIntoDocument(tabs);
		// expect(document.querySelectorAll('.react-tabs').length).toEqual(1);
	});
});

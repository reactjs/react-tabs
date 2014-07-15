/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	render: function () {
		return (
			<div className="mz-tabpanel">
				<ul className="mz-tabpanel-tabs">
					<li className="mz-tabpanel-tab mz-tabpanel-tab-active"><a>Tab 1</a></li>
					<li className="mz-tabpanel-tab"><a>Tab 2</a></li>
					<li className="mz-tabpanel-tab"><a>Tab 3</a></li>
				</ul>
				<section className="mz-tabpanel-content">
					<div>Content for tab 1</div>
				</section>
			</div>
		);
	}
});

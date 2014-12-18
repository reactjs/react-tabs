/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	displayName: 'TabList',

	render: function () {
		return (
			<ul role="tablist">
				{this.props.children}
			</ul>
		);
	}
});

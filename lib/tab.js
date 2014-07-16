var React = require('react');

module.exports = React.createClass({
	getLabel: function () {
		return this.props.label;
	},

	getContent: function () {
		return this.props.children;
	},

	render: function () {
		return this.getContent();
	}
});

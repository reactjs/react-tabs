/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	displayName: 'TabPanel',

	getDefaultProps: function () {
		return {
			selected: false,
			id: null,
			tabId: null
		};
	},

	render: function () {
		// Attributes
		var style = {display: this.props.selected ? '' : 'none'},
			ariaLabeledBy = this.props.tabId;

		return (
			<div role="tabpanel"
				id={this.props.id}
				aria-labeledby={ariaLabeledBy}
				style={style}>{this.props.children}</div>
		);
	}
});

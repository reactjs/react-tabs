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
		return (
			<div role="tabpanel"
				id={this.props.id}
				aria-labeledby={this.props.tabId}
				style={{display: this.props.selected ? '' : 'none'}}
      >
        {this.props.children}
      </div>
		);
	}
});

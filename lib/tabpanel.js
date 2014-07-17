/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			active: false,
			id: null,
			labeledby: null
		};
	},

	setActive: function (active) {
		this.setState({ active: active });
	},

	isActive: function () {
		return this.state.active;
	},

	render: function () {
		// Attributes
		var style = {display: this.state.active ? '' : 'none'};

		return (
			<div role="tabpanel"
				id={this.state.id}
				aria-labeledby={this.state.labeledby}
				style={style}>{this.props.children}</div>
		);
	}
});

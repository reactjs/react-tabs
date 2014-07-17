/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			selected: false,
			id: null,
			labeledby: null
		};
	},

	setSelected: function (selected) {
		this.setState({ selected: selected });
	},

	isSelected: function () {
		return this.state.selected;
	},

	render: function () {
		// Attributes
		var style = {display: this.state.selected ? '' : 'none'};

		return (
			<div role="tabpanel"
				id={this.state.id}
				aria-labeledby={this.state.labeledby}
				style={style}>{this.props.children}</div>
		);
	}
});

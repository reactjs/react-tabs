/** @jsx React.DOM */
var React = require('react'),
	util = require('./util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			selected: false,
			id: util.uuid(),
			tab: null
		};
	},

	setSelected: function (selected) {
		this.setState({ selected: selected });
	},

	isSelected: function () {
		return this.state.selected;
	},

	getId: function () {
		return this.state.id;
	},

	getTab: function () {
		return this.state.tab;
	},

	render: function () {
		// Attributes
		var tab = this.getTab(),
			style = {display: this.isSelected() ? '' : 'none'},
			ariaLabeledBy = tab;

		return (
			<div role="tabpanel"
				id={this.getId()}
				aria-labeledby={ariaLabeledBy}
				style={style}>{this.props.children}</div>
		);
	}
});

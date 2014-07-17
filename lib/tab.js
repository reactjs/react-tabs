/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			active: false,
			index: null,
			id: null,
			controls: null
		};
	},

	setActive: function (active) {
		this.setState({ active: active });

		// Call change event handler
		if (typeof this.props.onActiveChange === 'function') {
			this.props.onActiveChange(active, this);
		}
	},

	isActive: function () {
		return this.state.active;
	},

	render: function () {
		// Handle tab being clicked
		var onClick = function () {
			this.setActive(true);
		}.bind(this);

		// Attributes
		var ariaSelected = this.state.active ? 'true' : 'false',
			ariaExpanded = this.state.active ? 'true' : 'false',
			ariaControls = this.state.controls;

		return (
			<li role="tab"
				id={this.state.id}
				data-index={this.state.index}
				aria-selected={ariaSelected}
				aria-expanded={ariaExpanded}
				aria-controls={ariaControls}
				onClick={onClick}>{this.props.children}</li>
		);
	}
});

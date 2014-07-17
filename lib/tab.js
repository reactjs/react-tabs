/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			selected: false,
			index: null,
			id: null,
			controls: null
		};
	},

	setSelected: function (selected, focus) {
		this.setState({ selected: selected });
		if (focus) {
			this.__needsFocus = true;
		}
	},

	isSelected: function () {
		return this.state.selected;
	},

	componentDidUpdate: function () {
		var node = this.getDOMNode();

		if (this.isSelected()) {
			node.setAttribute('tabindex', 0);
			node.setAttribute('selected', 'selected');
			if (this.__needsFocus) {
				node.focus();
				delete this.__needsFocus;
			}
		} else {
			node.removeAttribute('tabindex');
			node.removeAttribute('selected');
		}
	},

	render: function () {
		// Attributes
		var ariaSelected = this.state.selected ? 'true' : 'false',
			ariaExpanded = this.state.selected ? 'true' : 'false',
			ariaControls = this.state.controls;

		return (
			<li role="tab"
				id={this.state.id}
				data-index={this.state.index}
				aria-selected={ariaSelected}
				aria-expanded={ariaExpanded}
				aria-controls={ariaControls}>{this.props.children}</li>
		);
	}
});

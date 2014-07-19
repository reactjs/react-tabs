/** @jsx React.DOM */
var React = require('react'),
	util = require('./util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			selected: false,
			id: util.uuid(),
			panel: null
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

	getId: function () {
		return this.state.id;
	},

	getPanel: function () {
		return this.state.panel;
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
		var panel = this.getPanel(),
			ariaSelected = this.isSelected() ? 'true' : 'false',
			ariaExpanded = this.isSelected() ? 'true' : 'false',
			ariaControls = panel;

		return (
			<li role="tab"
				id={this.getId()}
				aria-selected={ariaSelected}
				aria-expanded={ariaExpanded}
				aria-controls={ariaControls}>{this.props.children}</li>
		);
	}
});

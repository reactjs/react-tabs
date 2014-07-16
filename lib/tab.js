/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			active: false
		};
	},

	getLabel: function () {
		return this.props.label;
	},

	getContent: function () {
		return this.props.children;
	},

	setActive: function (active) {
		// Don't do anything if nothing has changed
		if (active === this.state.active) return;

		// Update className
		var className = 'mz-tabpanel-tab';
		if (active) {
			className += ' mz-tabpanel-tab-active';
		}
		this.getDOMNode().className = className;

		// Update state
		this.setState({ active: active });

		// Call change event handler
		if (typeof this.props.onActiveChange === 'function') {
			this.props.onActiveChange(active);
		}
	},

	isActive: function () {
		return this.state.active;
	},

	componentWillReceiveProps: function (props) {
		this.setActive(props.active === true);
	},

	componentDidMount: function () {
		this.setActive(this.props.active === true);
	},

	render: function () {
		// Handle tab being clicked
		var onClick = function () {
			this.setActive(true);
		}.bind(this);

		return (
			<li className="mz-tabpanel-tab" onClick={onClick}><a>{this.getLabel()}</a></li>
		);
	}
});

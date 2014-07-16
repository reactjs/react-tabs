/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			active: 0
		};
	},

	setActive: function (index) {
		// Reset currently active
		var activeTab = this.refs['tab' + this.state.active];
		if (activeTab) {
			activeTab.getDOMNode().className = 'mz-tabpanel-tab';
		}

		// Update active
		this.state.active = index;
		activeTab = this.refs['tab' + this.state.active];
		if (activeTab) {
			activeTab.getDOMNode().className += ' mz-tabpanel-tab-active';
		}

		// Update content
		this.refs.content.getDOMNode().innerHTML = this.props.children[this.state.active].getContent();
	},

	componentDidMount: function () {
		this.setActive(this.state.active);
	},

	render: function () {
		var tabs = this.props.children.map(function (tab, index) {
			var ref = 'tab' + index,
				onClick = function () {
					this.setActive(index);
				}.bind(this);

			return <li ref={ref} className="mz-tabpanel-tab" onClick={onClick}><a>{tab.getLabel()}</a></li>;
		}, this);

		return (
			<div className="mz-tabpanel">
				<ul ref="tabs" className="mz-tabpanel-tabs">
					{tabs}
				</ul>
				<section ref="content" className="mz-tabpanel-content"></section>
			</div>
		);
	}
});

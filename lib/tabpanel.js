/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			activeIndex: -1
		};
	},

	setActive: function (index) {
		// Short circuit if already processing
		if (this.__processingActive) return;
		// Don't do anything if nothing has changed
		if (index === this.state.activeIndex) return;
		// Check index boundary
		if (index < 0 || index >= this.props.children.length) return;

		// Flag so that setActive doesn't go recursive
		this.__processingActive = true;

		// Reset currently active
		var activeTab = this.props.children[this.state.activeIndex];
		if (activeTab) activeTab.setActive(false);

		// Update active
		this.setState({ activeIndex: index });
		activeTab = this.props.children[index];
		if (activeTab) activeTab.setActive(true);

		// Update content
		this.refs.content.getDOMNode().innerHTML = activeTab.getContent();

		// Clear flag
		delete this.__processingActive;
	},

	componentDidMount: function () {
		// Detect any tab that wants to default as active
		var activeIndex = 0;
		this.props.children.forEach(function (tab, index) {
			if (tab.isActive()) {
				activeIndex = index;
			}
		}, this);

		this.setActive(activeIndex);
	},

	render: function () {
		// Setup tabs for panel
		var tabs = this.props.children.map(function (tab, index) {
			// Add change event handler
			tab.props.onActiveChange = function (active) {
				if (active) {
					this.setActive(index);
				}
			}.bind(this);

			return tab;
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

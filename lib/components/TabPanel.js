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
    var children = this.props.selected ? this.props.children : null;

		return React.DOM.div({
        role: 'tabpanel',
        id: this.props.id,
        'aria-labeledby': this.props.tabId,
        style: {display: this.props.selected ? null : 'none'}
      },
      children
    );
	}
});

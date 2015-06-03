var React = require('react');

module.exports = React.createClass({
	displayName: 'TabList',

	render: function () {
		return React.DOM.ul({
        role: 'tablist'
      },
      this.props.children
		);
	}
});

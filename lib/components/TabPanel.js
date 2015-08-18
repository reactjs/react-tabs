/* eslint indent:0 */
import React, {PropTypes} from 'react';

module.exports = React.createClass({
	displayName: 'TabPanel',

  propTypes: {
    selected: PropTypes.bool,
    id: PropTypes.string,
    tabId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ])
  },

	getDefaultProps() {
    return {
			selected: false,
			id: null,
			tabId: null
		};
	},

	render() {
    const children = this.props.selected ? this.props.children : null;

    return (
      <div
        role="tabpanel"
        id={this.props.id}
        aria-labeledby={this.props.tabId}
        style={{display: this.props.selected ? null : 'none'}}
      >
        {children}
      </div>
    );
	}
});

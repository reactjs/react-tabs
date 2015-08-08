/* eslint indent:0 */
import React, {PropTypes} from 'react';

module.exports = React.createClass({
	displayName: 'TabList',

  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  },

	render() {
    return (
      <ul role="tablist">
        {this.props.children}
      </ul>
    );
	}
});

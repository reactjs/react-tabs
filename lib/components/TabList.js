import React, {PropTypes} from 'react';
import cx from 'classnames';

module.exports = React.createClass({
  displayName: 'TabList',

  propTypes: {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  },

  render() {
    return (
      <ul
        className={cx(
          'ReactTabs__TabList',
          this.props.className
        )}
        role="tablist"
      >
        {this.props.children}
      </ul>
    );
  }
});

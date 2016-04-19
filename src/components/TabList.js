import React, { PropTypes } from 'react';
import cx from 'classnames';

module.exports = React.createClass({
  displayName: 'TabList',

  propTypes: {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  },

  render() {
    const { className, children, ...attributes } = this.props;

    return (
      <ul
        {...attributes}
        className={cx(
          'ReactTabs__TabList',
          className
        )}
        role="tablist"
      >
        {children}
      </ul>
    );
  },
});

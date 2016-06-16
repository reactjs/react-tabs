import React, { PropTypes } from 'react';
import cx from 'classnames';

function renderChildren(props) {
  return React.Children.map(props.children, (child) =>
    React.cloneElement(child, {
      activeTabClassName: props.activeTabClassName,
      disabledTabClassName: props.disabledTabClassName,
    })
  );
}

module.exports = React.createClass({
  displayName: 'TabList',

  propTypes: {
    className: PropTypes.string,
    activeTabClassName: PropTypes.string,
    disabledTabClassName: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  },

  render() {
    const {
      className,
      activeTabClassName,
      disabledTabClassName,
      children,
      ...attributes } = this.props;

    return (
      <ul
        {...attributes}
        className={cx(
          'ReactTabs__TabList',
          className
        )}
        role="tablist"
      >
        {renderChildren({ activeTabClassName, disabledTabClassName, children })}
      </ul>
    );
  },
});

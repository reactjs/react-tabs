import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import cx from 'classnames';
import Tab from './Tab';

function renderChildren(props) {
  return React.Children.map(props.children, (child) => {
    // if child is not a tab we don't need to clone it
    // since we don't need to add custom props

    if (child.type !== Tab) {
      return child;
    }

    const clonedProps = {
      activeTabClassName: props.activeTabClassName,
      disabledTabClassName: props.disabledTabClassName,
    };

    return React.cloneElement(child, clonedProps);
  });
}

module.exports = createReactClass({
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

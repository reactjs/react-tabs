import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import Tab from './Tab';

export default class TabList extends Component {

  static propTypes = {
    activeTabClassName: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    className: PropTypes.string,
    disabledTabClassName: PropTypes.string,
  };

  renderChildren() {
    const {
      activeTabClassName,
      children,
      disabledTabClassName,
    } = this.props;

    return React.Children.map(children, (child) => {
      // if child is not a tab we don't need to clone it
      // since we don't need to add custom props

      if (child.type === Tab) {
        return React.cloneElement(child, {
          activeTabClassName,
          disabledTabClassName,
        });
      }

      return child;
    });
  }

  render() {
    const {
      activeTabClassName, // eslint-disable-line no-unused-vars
      children, // eslint-disable-line no-unused-vars
      className,
      disabledTabClassName, // eslint-disable-line no-unused-vars
      ...attributes } = this.props;

    return (
      <ul
        {...attributes}
        className={cx(
          'ReactTabs__TabList',
          className,
        )}
        role="tablist"
      >
        {this.renderChildren()}
      </ul>
    );
  }
}

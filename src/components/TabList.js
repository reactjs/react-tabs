import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

export default class TabList extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    className: PropTypes.string,
  };

  render() {
    const {
      children,
      className,
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
        {children}
      </ul>
    );
  }
}

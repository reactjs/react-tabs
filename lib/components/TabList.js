import React, {PropTypes} from 'react';
import cx from 'classnames';

module.exports = React.createClass({
  displayName: 'TabList',

  propTypes: {
    className: PropTypes.string,
    activeTabClassName: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  },

  render() {
    const children = this._renderChildren();

    return (
      <ul
        className={cx(
          'ReactTabs__TabList',
          this.props.className
        )}
        role="tablist"
      >
        {children}
      </ul>
    );
  },

  _renderChildren() {
    let children;
    const activeTabClassName = this.props.activeTabClassName;

    if (activeTabClassName) {
      const childrenProps = {
        activeTabClassName: activeTabClassName
      };

      children = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, childrenProps);
      });
    } else {
      children = this.props.children;
    }

    return children;
  }
});

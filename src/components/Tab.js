import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';

function syncNodeAttributes(node, props) {
  if (props.selected) {
    node.setAttribute('tabindex', '0');
    node.setAttribute('selected', 'selected');
    if (props.focus) {
      node.focus();
    }
  } else {
    node.removeAttribute('tabindex');
    node.removeAttribute('selected');
  }
}

module.exports = React.createClass({
  displayName: 'Tab',

  propTypes: {
    className: PropTypes.string,
    id: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    activeTabClassName: PropTypes.string,
    disabledTabClassName: PropTypes.string,
    panelId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
  },

  getDefaultProps() {
    return {
      focus: false,
      selected: false,
      id: null,
      panelId: null,
      activeTabClassName: 'ReactTabs__Tab--selected',
      disabledTabClassName: 'ReactTabs__Tab--disabled',
    };
  },

  componentDidMount() {
    syncNodeAttributes(findDOMNode(this), this.props);
  },

  componentDidUpdate() {
    syncNodeAttributes(findDOMNode(this), this.props);
  },

  render() {
    const {
      selected,
      disabled,
      panelId,
      activeTabClassName,
      disabledTabClassName,
      className,
      children,
      id,
      ...attributes } = this.props;

    return (
      <li
        {...attributes}
        className={cx(
          'ReactTabs__Tab',
          className,
          {
            [`${activeTabClassName}`]: selected,
            [`${disabledTabClassName}`]: disabled,
          }
        )}
        role="tab"
        id={id}
        aria-selected={selected ? 'true' : 'false'}
        aria-expanded={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-controls={panelId}
      >
        {children}
      </li>
    );
  },
});

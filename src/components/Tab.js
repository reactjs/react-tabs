import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';

module.exports = React.createClass({
  displayName: 'Tab',

  propTypes: {
    className: PropTypes.string,
    id: PropTypes.string,
    focus: PropTypes.bool,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
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
    };
  },

  componentDidMount() {
    this.checkFocus();
  },

  componentDidUpdate() {
    this.checkFocus();
  },

  checkFocus() {
    if (this.props.selected && this.props.focus) {
      findDOMNode(this).focus();
    }
  },

  render() {
    const { selected, disabled, panelId, className, children, id, ...attributes } = this.props;

    return (
      <li
        {...attributes}
        className={cx(
          'ReactTabs__Tab',
          className,
          {
            'ReactTabs__Tab--selected': selected,
            'ReactTabs__Tab--disabled': disabled,
          }
        )}
        role="tab"
        id={id}
        aria-selected={selected ? 'true' : 'false'}
        aria-expanded={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex={selected ? '0' : null}
      >
        {children}
      </li>
    );
  },
});

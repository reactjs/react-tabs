import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

export default class Tab extends Component {

  static defaultProps = {
    activeTabClassName: 'ReactTabs__Tab--selected',
    disabledTabClassName: 'ReactTabs__Tab--disabled',
    focus: false,
    id: null,
    panelId: null,
    selected: false,
  };

  static propTypes = {
    activeTabClassName: PropTypes.string,
    disabledTabClassName: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    focus: PropTypes.bool, // private
    id: PropTypes.string, // private
    panelId: PropTypes.string, // private
    selected: PropTypes.bool, // private
    tabRef: PropTypes.func, // private
  };

  componentDidMount() {
    this.checkFocus();
  }

  componentDidUpdate() {
    this.checkFocus();
  }

  checkFocus() {
    if (this.props.selected && this.props.focus) {
      this.node.focus();
    }
  }

  render() {
    const {
      activeTabClassName,
      children,
      className,
      disabled,
      disabledTabClassName,
      focus, // eslint-disable-line no-unused-vars
      id,
      panelId,
      selected,
      tabRef,
      ...attributes } = this.props;

    return (
      <li
        {...attributes}
        className={cx(
          'ReactTabs__Tab',
          className,
          {
            [activeTabClassName]: selected,
            [disabledTabClassName]: disabled,
          },
        )}
        ref={(node) => { this.node = node; if (tabRef) tabRef(node); }}
        role="tab"
        id={id}
        aria-selected={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex={selected ? '0' : null}
      >
        {children}
      </li>
    );
  }
}

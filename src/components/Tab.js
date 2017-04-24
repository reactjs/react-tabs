import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

export default class Tab extends Component {
  static defaultProps = {
    className: 'ReactTabs__Tab',
    disabledClassName: 'ReactTabs__Tab--disabled',
    focus: false,
    id: null,
    panelId: null,
    selected: false,
    selectedClassName: 'ReactTabs__Tab--selected',
  };

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ]),
    disabled: PropTypes.bool,
    disabledClassName: PropTypes.string, // private
    focus: PropTypes.bool, // private
    id: PropTypes.string, // private
    panelId: PropTypes.string, // private
    selected: PropTypes.bool, // private
    selectedClassName: PropTypes.string, // private
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
      children,
      className,
      disabled,
      disabledClassName,
      focus, // eslint-disable-line no-unused-vars
      id,
      panelId,
      selected,
      selectedClassName,
      tabRef,
      ...attributes
    } = this.props;

    return (
      <li
        {...attributes}
        className={cx(className, {
          [selectedClassName]: selected,
          [disabledClassName]: disabled,
        })}
        ref={node => {
          this.node = node;
          if (tabRef) tabRef(node);
        }}
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

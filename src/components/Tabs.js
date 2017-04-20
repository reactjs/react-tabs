import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { childrenPropType, onSelectPropType, selectedIndexPropType } from '../helpers/propTypes';
import UncontrolledTabs from './UncontrolledTabs';
import { getTabsCount } from '../helpers/count';

export default class Tabs extends Component {

  static defaultProps = {
    defaultFocus: false,
    forceRenderTabPanel: false,
    selectedIndex: null,
    defaultIndex: null,
  };

  static propTypes = {
    activeTabClassName: PropTypes.string,
    activeTabPanelClassName: PropTypes.string,
    children: childrenPropType,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    defaultFocus: PropTypes.bool,
    defaultIndex: PropTypes.number,
    disabledTabClassName: PropTypes.string,
    forceRenderTabPanel: PropTypes.bool,
    onSelect: onSelectPropType,
    selectedIndex: selectedIndexPropType,
  };

  constructor(props) {
    super(props);

    this.state = Tabs.copyPropsToState(this.props, {});
  }

  componentWillReceiveProps(newProps) {
    if (
      process.env.NODE_ENV !== 'production' &&
      Tabs.inUncontrolledMode(newProps) !== Tabs.inUncontrolledMode(this.props)
    ) {
      throw new Error(
`Switching between controlled mode (by using \`selectedIndex\`) and uncontrolled mode is not supported in \`Tabs\`.
For more information about controlled and uncontrolled mode of react-tabs see the README.`,
        );
    }
    // Use a transactional update to prevent race conditions
    // when reading the state in copyPropsToState
    // See https://github.com/reactjs/react-tabs/issues/51
    this.setState(state => Tabs.copyPropsToState(newProps, state));
  }

  static inUncontrolledMode(props) {
    return props.selectedIndex === null;
  }

  handleSelected = (index, last, event) => {
    // Call change event handler
    if (typeof this.props.onSelect === 'function') {
      // Check if the change event handler cancels the tab change
      if (this.props.onSelect(index, last, event) === false) return;
    }

    const state = {
      // Set focus if the change was triggered from the keyboard
      focus: event.type === 'keydown',
    };

    if (Tabs.inUncontrolledMode(this.props)) {
      // Update selected index
      state.selectedIndex = index;
    }

    this.setState(state);
  }

  // preserve the existing selectedIndex from state.
  // If the state has not selectedIndex, default to the defaultIndex or 0
  static copyPropsToState(props, state) {
    const newState = {
      focus: state.focus || props.defaultFocus,
    };

    if (Tabs.inUncontrolledMode(props)) {
      const maxTabIndex = getTabsCount(props.children) - 1;
      let selectedIndex = null;

      if (state.selectedIndex != null) {
        selectedIndex = Math.min(state.selectedIndex, maxTabIndex);
      } else {
        selectedIndex = props.defaultIndex || 0;
      }
      newState.selectedIndex = selectedIndex;
    }

    return newState;
  }

  render() {
    // This fixes an issue with focus management.
    //
    // Ultimately, when focus is true, and an input has focus,
    // and any change on that input causes a state change/re-render,
    // focus gets sent back to the active tab, and input loses focus.
    //
    // Since the focus state only needs to be remembered
    // for the current render, we can reset it once the
    // render has happened.
    //
    // Don't use setState, because we don't want to re-render.
    //
    // See https://github.com/reactjs/react-tabs/pull/7
    if (this.state.focus) {
      setTimeout(() => {
        this.state.focus = false;
      }, 0);
    }

    const { children, defaultIndex, defaultFocus, ...props } = this.props;

    props.focus = this.state.focus;
    props.onSelect = this.handleSelected;

    if (this.state.selectedIndex != null) {
      props.selectedIndex = this.state.selectedIndex;
    }

    return (
      <UncontrolledTabs {...props}>
        {children}
      </UncontrolledTabs>
    );
  }
}

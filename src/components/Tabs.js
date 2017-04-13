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
    children: childrenPropType,
    className: PropTypes.string,
    defaultFocus: PropTypes.bool,
    defaultIndex: PropTypes.number,
    forceRenderTabPanel: PropTypes.bool,
    onSelect: onSelectPropType,
    selectedIndex: selectedIndexPropType,
  };

  constructor(props) {
    super(props);

    if (this.props.selectedIndex === null) {
      this.state = Tabs.copyPropsToState(this.props, {});
    } else {
      this.state = {};
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.selectedIndex === null) {
      // Use a transactional update to prevent race conditions
      // when reading the state in copyPropsToState
      // See https://github.com/reactjs/react-tabs/issues/51
      this.setState(state => Tabs.copyPropsToState(newProps, state));
    }
  }

  handleSelected = (index, last, event) => {
    if (this.state.selectedIndex != null) {
      // Check if the change event handler cancels the tab change
      let cancel = false;

      // Call change event handler
      if (typeof this.props.onSelect === 'function') {
        cancel = this.props.onSelect(index, last, event) === false;
      }

      if (!cancel) {
        // Update selected index
        // Set focus if the change was triggered from the keyboard
        this.setState({ selectedIndex: index, focus: event instanceof KeyboardEvent });
      }
    }
  }

  // preserve the existing selectedIndex from state.
  // If the state has not selectedIndex, default to the defaultIndex or 0
  static copyPropsToState(props, state) {
    const maxTabIndex = getTabsCount(props.children) - 1;
    let selectedIndex = null;

    if (state.selectedIndex != null) {
      selectedIndex = Math.min(state.selectedIndex, maxTabIndex);
    } else {
      selectedIndex = props.defaultIndex || 0;
    }

    return {
      selectedIndex,
      focus: state.focus || props.defaultFocus,
    };
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

    if (this.state.selectedIndex != null) {
      props.focus = this.state.focus;
      props.onSelect = this.handleSelected;
      props.selectedIndex = this.state.selectedIndex;
    }

    return (
      <UncontrolledTabs {...props}>
        {children}
      </UncontrolledTabs>
    );
  }
}

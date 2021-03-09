import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  childrenPropType,
  onSelectPropType,
  selectedIndexPropType,
} from '../helpers/propTypes';
import UncontrolledTabs from './UncontrolledTabs';
import { getTabsCount } from '../helpers/count';

const MODE_CONTROLLED = 0;
const MODE_UNCONTROLLED = 1;

export default class Tabs extends Component {
  static defaultProps = {
    defaultFocus: false,
    forceRenderTabPanel: false,
    selectedIndex: null,
    defaultIndex: null,
    environment: null,
    disableUpDownKeys: false,
  };

  static propTypes = {
    children: childrenPropType,
    direction: PropTypes.oneOf(['rtl', 'ltr']),
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ]),
    defaultFocus: PropTypes.bool,
    defaultIndex: PropTypes.number,
    disabledTabClassName: PropTypes.string,
    disableUpDownKeys: PropTypes.bool,
    domRef: PropTypes.func,
    forceRenderTabPanel: PropTypes.bool,
    onSelect: onSelectPropType,
    selectedIndex: selectedIndexPropType,
    selectedTabClassName: PropTypes.string,
    selectedTabPanelClassName: PropTypes.string,
    environment: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = Tabs.copyPropsToState(this.props, {}, props.defaultFocus);
  }

  static getDerivedStateFromProps(props, state) {
    return Tabs.copyPropsToState(props, state);
  }

  static getModeFromProps(props) {
    return props.selectedIndex === null ? MODE_UNCONTROLLED : MODE_CONTROLLED;
  }

  handleSelected = (index, last, event) => {
    const { onSelect } = this.props;
    const { mode } = this.state;

    // Call change event handler
    if (typeof onSelect === 'function') {
      // Check if the change event handler cancels the tab change
      if (onSelect(index, last, event) === false) return;
    }

    const state = {
      // Set focus if the change was triggered from the keyboard
      focus: event.type === 'keydown',
    };

    if (mode === MODE_UNCONTROLLED) {
      // Update selected index
      state.selectedIndex = index;
    }

    this.setState(state);
  };

  // preserve the existing selectedIndex from state.
  // If the state has not selectedIndex, default to the defaultIndex or 0
  static copyPropsToState(props, state, focus = false) {
    if (
      process.env.NODE_ENV !== 'production' &&
      state.mode !== undefined &&
      state.mode !== Tabs.getModeFromProps(props)
    ) {
      throw new Error(
        `Switching between controlled mode (by using \`selectedIndex\`) and uncontrolled mode is not supported in \`Tabs\`.
For more information about controlled and uncontrolled mode of react-tabs see the README.`,
      );
    }

    const newState = {
      focus,
      mode: Tabs.getModeFromProps(props),
    };

    if (newState.mode === MODE_UNCONTROLLED) {
      const maxTabIndex = Math.max(0, getTabsCount(props.children) - 1);
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
    const { children, defaultIndex, defaultFocus, ...props } = this.props;
    const { focus, selectedIndex } = this.state;

    props.focus = focus;
    props.onSelect = this.handleSelected;

    if (selectedIndex != null) {
      props.selectedIndex = selectedIndex;
    }

    return <UncontrolledTabs {...props}>{children}</UncontrolledTabs>;
  }
}

Tabs.tabsRole = 'Tabs';

import PropTypes from 'prop-types';
import React, { cloneElement, Component } from 'react';
import cx from 'classnames';
import uuid from '../helpers/uuid';
import { childrenPropType } from '../helpers/propTypes';
import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
  return node.getAttribute('aria-disabled') === 'true';
}

export default class UncontrolledTabs extends Component {

  static defaultProps = {
    className: '',
    focus: false,
    forceRenderTabPanel: false,
  };

  static propTypes = {
    children: childrenPropType,
    className: PropTypes.string,
    focus: PropTypes.bool,
    forceRenderTabPanel: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number.isRequired,
  };

  tabNodes = [];

  setSelected(index, event) {
    // Don't do anything if nothing has changed
    if (index === this.props.selectedIndex) return;
    // Check index boundary
    if (index < 0 || index >= this.getTabsCount()) return;

    // Call change event handler
    this.props.onSelect(index, this.props.selectedIndex, event);
  }

  getNextTab(index) {
    const count = this.getTabsCount();

    // Look for non-disabled tab from index to the last tab on the right
    for (let i = index + 1; i < count; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (let i = 0; i < index; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  }

  getPrevTab(index) {
    let i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.getTabsCount();
    while (i-- > index) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  }

  getTabsCount() {
    const tabLists = React.Children.toArray(this.props.children).filter(x => x.type === TabList);

    if (tabLists[0] && tabLists[0].props.children) {
      return React.Children.count(
        React.Children.toArray(tabLists[0].props.children).filter(x => x.type === Tab),
      );
    }

    return 0;
  }

  getPanelsCount() {
    return React.Children.count(
      React.Children.toArray(this.props.children).filter(x => x.type === TabPanel),
    );
  }

  getTab(index) {
    return this.tabNodes[`tabs-${index}`];
  }

  getChildren() {
    let index = 0;
    const children = this.props.children;
    this.tabIds = this.tabIds || [];
    this.panelIds = this.panelIds || [];
    let diff = this.tabIds.length - this.getTabsCount();

    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      this.tabIds.push(uuid());
      this.panelIds.push(uuid());
    }

    // Map children to dynamically setup refs
    return React.Children.map(children, (child) => {
      // null happens when conditionally rendering TabPanel/Tab
      // see https://github.com/reactjs/react-tabs/issues/37
      if (child === null) {
        return null;
      }

      let result = child;

      // Clone TabList and Tab components to have refs
      if (child.type === TabList) {
        let listIndex = 0;
        // TODO try setting the uuid in the "constructor" for `Tab`/`TabPanel`
        result = cloneElement(child, {
          children: React.Children.map(child.props.children, (tab) => {
            // null happens when conditionally rendering TabPanel/Tab
            // see https://github.com/reactjs/react-tabs/issues/37
            if (tab === null) {
              return null;
            }

            // Exit early if this is not a tab. That way we can have arbitrary
            // elements anywhere inside <TabList>
            if (tab.type !== Tab) return tab;

            const key = `tabs-${listIndex}`;
            const tabRef = (node) => { this.tabNodes[key] = node; };
            const id = this.tabIds[listIndex];
            const panelId = this.panelIds[listIndex];
            const selected = this.props.selectedIndex === listIndex;
            const focus = selected && this.props.focus;

            listIndex++;

            return cloneElement(tab, {
              tabRef,
              id,
              panelId,
              selected,
              focus,
            });
          }),
        });
      } else if (child.type === TabPanel) {
        const id = this.panelIds[index];
        const tabId = this.tabIds[index];
        const selected = this.props.selectedIndex === index;
        const forceRenderTabPanel = this.props.forceRenderTabPanel;

        index++;

        result = cloneElement(child, {
          id,
          tabId,
          selected,
          forceRenderTabPanel,
        });
      }

      return result;
    });
  }

  handleKeyDown = (e) => {
    if (this.isTabFromContainer(e.target)) {
      let index = this.props.selectedIndex;
      let preventDefault = false;

      // Select next tab to the left
      if (e.keyCode === 37 || e.keyCode === 38) {
        index = this.getPrevTab(index);
        preventDefault = true;
      }
      // Select next tab to the right
      /* eslint brace-style:0 */
      else if (e.keyCode === 39 || e.keyCode === 40) {
        index = this.getNextTab(index);
        preventDefault = true;
      }

      // This prevents scrollbars from moving around
      if (preventDefault) {
        e.preventDefault();
      }

      this.setSelected(index, e);
    }
  };

  handleClick = (e) => {
    let node = e.target;
    do { // eslint-disable-line no-cond-assign
      if (this.isTabFromContainer(node)) {
        if (isTabDisabled(node)) {
          return;
        }

        const index = [].slice.call(node.parentNode.children).filter(isTabNode).indexOf(node);
        this.setSelected(index, e);
        return;
      }
    } while ((node = node.parentNode) !== null);
  };

  /**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */
  isTabFromContainer(node) {
    // return immediately if the clicked element is not a Tab.
    if (!isTabNode(node)) {
      return false;
    }

    // Check if the first occurrence of a Tabs container is `this` one.
    let nodeAncestor = node.parentElement;
    do {
      if (nodeAncestor === this.node) return true;
      else if (nodeAncestor.getAttribute('data-tabs')) break;

      nodeAncestor = nodeAncestor.parentElement;
    } while (nodeAncestor);

    return false;
  }

  render() {
    // Delete all known props, so they don't get added to DOM
    const {
        className,
        selectedIndex,
        onSelect,
        focus,
        children,
        forceRenderTabPanel,
        ...attributes
    } = this.props;

    return (
      <div
        {...attributes}
        className={cx(
          'ReactTabs',
          'react-tabs',
          className,
        )}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        ref={(node) => { this.node = node; }}
        data-tabs
      >
        {this.getChildren()}
      </div>
    );
  }
}
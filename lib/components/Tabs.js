import React, {PropTypes, cloneElement} from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import jss from 'js-stylesheet';
import uuid from '../helpers/uuid';
import childrenPropType from '../helpers/childrenPropType';

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
  return node.getAttribute('aria-disabled') === 'true';
}

let useDefaultStyles = true;

module.exports = React.createClass({
  displayName: 'Tabs',

  propTypes: {
    className: PropTypes.string,
    selectedIndex: PropTypes.number,
    onSelect: PropTypes.func,
    children: childrenPropType,
    forceRenderTabPanel: PropTypes.bool
  },

  childContextTypes: {
    forceRenderTabPanel: PropTypes.bool
  },

  statics: {
    setUseDefaultStyles(use) {
      useDefaultStyles = use;
    }
  },

  getDefaultProps() {
    return {
      forceRenderTabPanel: false
    };
  },

  getInitialState() {
    return this.selectedIndexPropProvided() ? {} : {
      selectedIndex: 0
    };
  },

  getChildContext() {
    return {
      forceRenderTabPanel: this.props.forceRenderTabPanel
    };
  },

  componentDidMount() {
    if (useDefaultStyles) {
      jss(require('../helpers/styles.js'));
    }
  },

  componentDidUpdate() {
    if (this.needsFocus) {
      this.needsFocus = false;
      this.focusSelectedTab();
    }
  },

  handleClick(e) {
    let node = e.target;
    do {
      if (isTabNode(node)) {
        if (isTabDisabled(node)) {
          return;
        }

        const index = [].slice.call(node.parentNode.children).indexOf(node);
        this.setSelected(index);
        return;
      }
    } while ((node = node.parentNode) !== null);
  },

  handleKeyDown(e) {
    if (isTabNode(e.target)) {
      let index = this.getSelectedIndex();
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

      this.setSelected(index, true);
    }
  },

  setSelected(index, focus) {
    // Don't do anything if nothing has changed
    if (index === this.getSelectedIndex()) return;

    // mark whether focus is needed after next re-render
    this.needsFocus = focus;

    // Call change event handler
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(index);
    } else { // default "uncontrolled component" behavior
      this.setState({ selectedIndex: index });
    }
  },

  getSelectedIndex() {
    const authority = this.selectedIndexPropProvided() ? this.props : this.state;
    return authority.selectedIndex;
  },

  // from `index`, step thru tabs looking for a non-disabled one, and
  // return the index of the first one you find. if `increment` is 1,
  // step towards the right. if it's -1, step towards the left.
  getNextTab(index, increment = 1) {
    const count = this.getTabsCount();
    let nextIndex;
    let delta = count + increment;
    for (let i = 0; i < count; i++, delta += increment) {
      nextIndex = (index + delta) % count;
      if (!isTabDisabled(findDOMNode(this.getTab(nextIndex)))) {
        break;
      }
    }
    return nextIndex;
  },

  getPrevTab(index) {
    return this.getNextTab(index, -1);
  },

  getTabsCount() {
    return this.props.children && this.props.children[0] ?
            React.Children.count(this.props.children[0].props.children) :
            0;
  },

  getPanelsCount() {
    return React.Children.count(this.props.children.slice(1));
  },

  getTabList() {
    return this.refs.tablist;
  },

  getTab(index) {
    return this.refs['tabs-' + index];
  },

  getPanel(index) {
    return this.refs['panels-' + index];
  },

  getChildren() {
    let index = 0;
    let count = 0;
    const children = this.props.children;
    const tabIds = this.tabIds = this.tabIds || [];
    const panelIds = this.panelIds = this.panelIds || [];
    let diff = this.tabIds.length - this.getTabsCount();

    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      tabIds.push(uuid());
      panelIds.push(uuid());
    }

    // Map children to dynamically setup refs
    return React.Children.map(children, (child) => {
      // null happens when conditionally rendering TabPanel/Tab
      // see https://github.com/rackt/react-tabs/issues/37
      if (child === null) {
        return null;
      }

      let result = null;

      // Clone TabList and Tab components to have refs
      if (count++ === 0) {
        // TODO try setting the uuid in the "constructor" for `Tab`/`TabPanel`
        result = cloneElement(child, {
          ref: 'tablist',
          children: React.Children.map(child.props.children, (tab) => {
            // null happens when conditionally rendering TabPanel/Tab
            // see https://github.com/rackt/react-tabs/issues/37
            if (tab === null) {
              return null;
            }

            const ref = 'tabs-' + index;
            const id = tabIds[index];
            const panelId = panelIds[index];
            const selected = this.getSelectedIndex() === index;

            index++;

            return cloneElement(tab, {
              ref,
              id,
              panelId,
              selected
            });
          })
        });

        // Reset index for panels
        index = 0;
      }
      // Clone TabPanel components to have refs
      else {
        const ref = 'panels-' + index;
        const id = panelIds[index];
        const tabId = tabIds[index];
        const selected = this.getSelectedIndex() === index;

        index++;

        result = cloneElement(child, {
          ref,
          id,
          tabId,
          selected
        });
      }

      return result;
    });
  },

  render() {
    return (
      <div
        className={cx(
          'ReactTabs',
          'react-tabs',
          this.props.className
        )}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        {this.getChildren()}
      </div>
    );
  },

  selectedIndexPropProvided() {
    return (typeof this.props.selectedIndex === 'number');
  },

  focusSelectedTab() {
    const selectedTab = this.refs[`tabs-${this.getSelectedIndex()}`];
    findDOMNode(selectedTab).focus();
  }
});

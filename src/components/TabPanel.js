import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

export default class TabPanel extends Component {

  static defaultProps = {
    style: {},
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    forceRenderTabPanel: PropTypes.bool, // private
    id: PropTypes.string, // private
    selected: PropTypes.bool, // private
    style: PropTypes.object,
    tabId: PropTypes.string, // private
  };

  render() {
    const {
      children,
      className,
      forceRenderTabPanel,
      id,
      selected,
      style,
      tabId,
      ...attributes } = this.props;

    return (
      <div
        {...attributes}
        className={cx(
          'ReactTabs__TabPanel',
          className,
          {
            'ReactTabs__TabPanel--selected': selected,
          },
        )}
        role="tabpanel"
        id={id}
        aria-labelledby={tabId}
        style={{ ...style, display: selected ? null : 'none' }}
      >
        {(forceRenderTabPanel || selected) ? children : null}
      </div>
    );
  }
}

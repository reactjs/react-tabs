import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

export default class TabPanel extends Component {

  static contextTypes = {
    forceRenderTabPanel: PropTypes.bool,
  };

  static defaultProps = {
    id: null,
    selected: false,
    tabId: null,
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    selected: PropTypes.bool,
    style: PropTypes.object,
    tabId: PropTypes.string,
  };

  render() {
    const {
      children,
      className,
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
        {(this.context.forceRenderTabPanel || selected) ? children : null}
      </div>
    );
  }
}

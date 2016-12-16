import React, { PropTypes } from 'react';
import cx from 'classnames';

module.exports = React.createClass({
  displayName: 'TabPanel',

  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    id: PropTypes.string,
    selected: PropTypes.bool,
    selectedClassName: PropTypes.string,
    style: PropTypes.object,
    tabId: PropTypes.string,
  },

  contextTypes: {
    forceRenderTabPanel: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      selected: false,
      selectedClassName: null,
      style: {},
      id: null,
      tabId: null,
    };
  },

  render() {
    const {
      id, tabId, selected,
      className, selectedClassName, style, children,
      ...attrs,
    } = this.props;

    // Only hide using inline styles if `selectedClassName` isn't provided
    const hiddenStyle = selectedClassName ? style : { ...style, display: 'none' };

    return (
      <div
        {...attrs}
        className={cx(
          'ReactTabs__TabPanel',
          className,
          {
            [selectedClassName || 'ReactTabs__TabPanel--selected']: selected,
          }
        )}
        role="tabpanel"
        id={id}
        aria-labelledby={tabId}
        style={selected ? style : hiddenStyle}
      >
        {(this.context.forceRenderTabPanel || selected) ? children : null}
      </div>
    );
  },
});

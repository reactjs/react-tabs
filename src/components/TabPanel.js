import React, { PropTypes } from 'react';
import cx from 'classnames';

module.exports = React.createClass({
  displayName: 'TabPanel',

  propTypes: {
    className: PropTypes.string,
    selected: PropTypes.bool,
    id: PropTypes.string,
    tabId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
  },

  contextTypes: {
    forceRenderTabPanel: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      selected: false,
      id: null,
      tabId: null,
    };
  },

  render() {
    const { className, children, selected, id, tabId, ...attributes } = this.props;

    return (
      <div
        {...attributes}
        className={cx(
          'ReactTabs__TabPanel',
          className,
          {
            'ReactTabs__TabPanel--selected': selected,
          }
        )}
        role="tabpanel"
        id={id}
        aria-labelledby={tabId}
        style={{ display: selected ? null : 'none' }}
      >
        {(this.context.forceRenderTabPanel || selected) ? children : null}
      </div>
    );
  },
});

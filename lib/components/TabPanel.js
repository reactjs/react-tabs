import React, {PropTypes} from 'react';
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
      PropTypes.string
    ])
  },

  contextTypes: {
    forceRenderTabPanel: PropTypes.bool
  },

  getDefaultProps() {
    return {
      selected: false,
      id: null,
      tabId: null
    };
  },

  render() {
    const children = (this.context.forceRenderTabPanel || this.props.selected) ?
      this.props.children :
      null;

    return (
      <div
        className={cx(
          'ReactTabs__TabPanel',
          this.props.className,
          {
            'ReactTabs__TabPanel--selected': this.props.selected
          }
        )}
        role="tabpanel"
        id={this.props.id}
        aria-labelledby={this.props.tabId}
        style={{display: this.props.selected ? null : 'none'}}
      >
        {children}
      </div>
    );
  }
});

import React, {PropTypes} from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';

function syncNodeAttributes(node, props) {
  // tabindex and selected misbehave when trying to set them like other JSX
  // attributes. see https://github.com/facebook/react/issues/2528
  if (props.selected) {
    node.setAttribute('tabindex', 0);
    node.setAttribute('selected', 'selected');
  } else {
    node.removeAttribute('tabindex');
    node.removeAttribute('selected');
  }
}

module.exports = React.createClass({
  displayName: 'Tab',

  propTypes: {
    className: PropTypes.string,
    id: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    panelId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ])
  },

  getDefaultProps() {
    return {
      selected: false,
      id: null,
      panelId: null
    };
  },

  componentDidMount() {
    syncNodeAttributes(findDOMNode(this), this.props);
  },

  componentDidUpdate() {
    syncNodeAttributes(findDOMNode(this), this.props);
  },

  render() {
    return (
      <li
        className={cx(
          'ReactTabs__Tab',
          this.props.className,
          {
            'ReactTabs__Tab--selected': this.props.selected,
            'ReactTabs__Tab--disabled': this.props.disabled
          }
        )}
        role="tab"
        id={this.props.id}
        aria-selected={this.props.selected ? 'true' : 'false'}
        aria-expanded={this.props.selected ? 'true' : 'false'}
        aria-disabled={this.props.disabled ? 'true' : 'false'}
        aria-controls={this.props.panelId}
      >
        {this.props.children}
      </li>
    );
  }
});

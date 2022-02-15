import PropTypes from 'prop-types';
import React from 'react';
import cx from 'clsx';

const DEFAULT_CLASS = 'react-tabs__tab-panel';
const defaultProps = {
  className: DEFAULT_CLASS,
  forceRender: false,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};
const propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  forceRender: PropTypes.bool,
  id: PropTypes.string, // private
  selected: PropTypes.bool, // private
  selectedClassName: PropTypes.string,
  tabId: PropTypes.string, // private
};
const TabPanel = (props) => {
  const {
    children,
    className,
    forceRender,
    id,
    selected,
    selectedClassName,
    tabId,
    ...attributes
  } = props;

  return (
    <div
      {...attributes}
      className={cx(className, {
        [selectedClassName]: selected,
      })}
      role="tabpanel"
      id={id}
      aria-labelledby={tabId}
    >
      {forceRender || selected ? children : null}
    </div>
  );
};

TabPanel.tabsRole = 'TabPanel';
TabPanel.propTypes = propTypes;
TabPanel.defaultProps = defaultProps;
export default TabPanel;

import React from 'react';
import cx from 'clsx';

const DEFAULT_CLASS = 'react-tabs__tab-panel';

/*
Left for TS migration
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
};
*/

const TabPanel = ({
  children,
  className = DEFAULT_CLASS,
  forceRender = false,
  selectedClassName = `${DEFAULT_CLASS}--selected`,
  id,
  selected,
  ...attributes
}) => {
  return (
    <div
      {...attributes}
      className={cx(className, {
        [selectedClassName]: selected,
      })}
      role="tabpanel"
      id={`panel${id}`}
      aria-labelledby={`tab${id}`}
    >
      {forceRender || selected ? children : null}
    </div>
  );
};

TabPanel.tabsRole = 'TabPanel';

export default TabPanel;

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
};

const DefaultDisabledTabComponent = () => {
  return <>Disabled Tab</>
}

const TabPanel = (props) => {
  const {
    children,
    className,
    forceRender,
    id,
    selected,
    selectedClassName,
    disabled,
    disabledpanel,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };
  const DisabledComponent = disabledpanel || DefaultDisabledTabComponent()

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
      {forceRender || selected ? !disabled? children: DisabledComponent : null}
    </div>
  );
};

TabPanel.tabsRole = 'TabPanel';
TabPanel.propTypes = propTypes;

export default TabPanel;

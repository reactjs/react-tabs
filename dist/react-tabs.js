(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types", "classnames"], factory);
	else if(typeof exports === 'object')
		exports["ReactTabs"] = factory(require("react"), require("prop-types"), require("classnames"));
	else
		root["ReactTabs"] = factory(root["React"], root["PropTypes"], root["classNames"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Tab.prototype.componentDidMount = function componentDidMount() {
    this.checkFocus();
  };

  Tab.prototype.componentDidUpdate = function componentDidUpdate() {
    this.checkFocus();
  };

  Tab.prototype.checkFocus = function checkFocus() {
    if (this.props.selected && this.props.focus) {
      this.node.focus();
    }
  };

  Tab.prototype.render = function render() {
    var _cx,
        _this2 = this;

    var _props = this.props,
        activeTabClassName = _props.activeTabClassName,
        children = _props.children,
        className = _props.className,
        disabled = _props.disabled,
        disabledTabClassName = _props.disabledTabClassName,
        focus = _props.focus,
        id = _props.id,
        panelId = _props.panelId,
        selected = _props.selected,
        tabRef = _props.tabRef,
        attributes = _objectWithoutProperties(_props, ['activeTabClassName', 'children', 'className', 'disabled', 'disabledTabClassName', 'focus', 'id', 'panelId', 'selected', 'tabRef']);

    return _react2.default.createElement(
      'li',
      _extends({}, attributes, {
        className: (0, _classnames2.default)('ReactTabs__Tab', className, (_cx = {}, _cx[activeTabClassName] = selected, _cx[disabledTabClassName] = disabled, _cx)),
        ref: function ref(node) {
          _this2.node = node;if (tabRef) tabRef(node);
        },
        role: 'tab',
        id: id,
        'aria-selected': selected ? 'true' : 'false',
        'aria-disabled': disabled ? 'true' : 'false',
        'aria-controls': panelId,
        tabIndex: selected ? '0' : null
      }),
      children
    );
  };

  return Tab;
}(_react.Component);

Tab.defaultProps = {
  activeTabClassName: 'ReactTabs__Tab--selected',
  disabledTabClassName: 'ReactTabs__Tab--disabled',
  focus: false,
  id: null,
  panelId: null,
  selected: false
};
exports.default = Tab;
 true ? Tab.propTypes = {
  activeTabClassName: _propTypes2.default.string,
  disabledTabClassName: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  focus: _propTypes2.default.bool, // private
  id: _propTypes2.default.string, // private
  panelId: _propTypes2.default.string, // private
  selected: _propTypes2.default.bool, // private
  tabRef: _propTypes2.default.func } : void 0;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _Tab = __webpack_require__(1);

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabList = function (_Component) {
  _inherits(TabList, _Component);

  function TabList() {
    _classCallCheck(this, TabList);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TabList.prototype.renderChildren = function renderChildren() {
    var _props = this.props,
        activeTabClassName = _props.activeTabClassName,
        children = _props.children,
        disabledTabClassName = _props.disabledTabClassName;


    return _react2.default.Children.map(children, function (child) {
      // if child is not a tab we don't need to clone it
      // since we don't need to add custom props

      if (child.type === _Tab2.default) {
        return _react2.default.cloneElement(child, {
          activeTabClassName: activeTabClassName,
          disabledTabClassName: disabledTabClassName
        });
      }

      return child;
    });
  };

  TabList.prototype.render = function render() {
    var _props2 = this.props,
        activeTabClassName = _props2.activeTabClassName,
        children = _props2.children,
        className = _props2.className,
        disabledTabClassName = _props2.disabledTabClassName,
        attributes = _objectWithoutProperties(_props2, ['activeTabClassName', 'children', 'className', 'disabledTabClassName']);

    return _react2.default.createElement(
      'ul',
      _extends({}, attributes, {
        className: (0, _classnames2.default)('ReactTabs__TabList', className),
        role: 'tablist'
      }),
      this.renderChildren()
    );
  };

  return TabList;
}(_react.Component);

exports.default = TabList;
 true ? TabList.propTypes = {
  activeTabClassName: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  className: _propTypes2.default.string,
  disabledTabClassName: _propTypes2.default.string
} : void 0;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPanel = function (_Component) {
  _inherits(TabPanel, _Component);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TabPanel.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        className = _props.className,
        forceRenderTabPanel = _props.forceRenderTabPanel,
        id = _props.id,
        selected = _props.selected,
        style = _props.style,
        tabId = _props.tabId,
        attributes = _objectWithoutProperties(_props, ['children', 'className', 'forceRenderTabPanel', 'id', 'selected', 'style', 'tabId']);

    return _react2.default.createElement(
      'div',
      _extends({}, attributes, {
        className: (0, _classnames2.default)('ReactTabs__TabPanel', className, {
          'ReactTabs__TabPanel--selected': selected
        }),
        role: 'tabpanel',
        id: id,
        'aria-labelledby': tabId,
        style: _extends({}, style, { display: selected ? null : 'none' })
      }),
      forceRenderTabPanel || selected ? children : null
    );
  };

  return TabPanel;
}(_react.Component);

TabPanel.defaultProps = {
  style: {}
};
exports.default = TabPanel;
 true ? TabPanel.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  forceRenderTabPanel: _propTypes2.default.bool, // private
  id: _propTypes2.default.string, // private
  selected: _propTypes2.default.bool, // private
  style: _propTypes2.default.object,
  tabId: _propTypes2.default.string } : void 0;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = uuid;
exports.reset = reset;
// Get a universally unique identifier
var count = 0;
function uuid() {
  return "react-tabs-" + count++;
}

function reset() {
  count = 0;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getTabsCount = getTabsCount;
exports.getPanelsCount = getPanelsCount;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TabList = __webpack_require__(3);

var _TabList2 = _interopRequireDefault(_TabList);

var _Tab = __webpack_require__(1);

var _Tab2 = _interopRequireDefault(_Tab);

var _TabPanel = __webpack_require__(4);

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTabsCount(children) {
  var tabLists = _react2.default.Children.toArray(children).filter(function (x) {
    return x.type === _TabList2.default;
  });

  if (tabLists[0] && tabLists[0].props.children) {
    return _react2.default.Children.count(_react2.default.Children.toArray(tabLists[0].props.children).filter(function (x) {
      return x.type === _Tab2.default;
    }));
  }

  return 0;
}

function getPanelsCount(children) {
  return _react2.default.Children.count(_react2.default.Children.toArray(children).filter(function (x) {
    return x.type === _TabPanel2.default;
  }));
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.childrenPropType = childrenPropType;
exports.onSelectPropType = onSelectPropType;
exports.selectedIndexPropType = selectedIndexPropType;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Tab = __webpack_require__(1);

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = __webpack_require__(3);

var _TabList2 = _interopRequireDefault(_TabList);

var _TabPanel = __webpack_require__(4);

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function childrenPropType(props, propName, componentName) {
  var error = void 0;
  var tabsCount = 0;
  var panelsCount = 0;
  var children = props[propName];

  _react2.default.Children.forEach(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) {
      return;
    }

    if (child.type === _TabList2.default) {
      _react2.default.Children.forEach(child.props.children, function (c) {
        // null happens when conditionally rendering TabPanel/Tab
        // see https://github.com/reactjs/react-tabs/issues/37
        if (c === null) {
          return;
        }

        if (c.type === _Tab2.default) {
          tabsCount++;
        }
      });
    } else if (child.type === _TabPanel2.default) {
      panelsCount++;
    } else {
      error = new Error('Expected \'TabList\' or \'TabPanel\' but found \'' + (child.type.displayName || child.type) + '\' in `' + componentName + '`');
    }
  });

  if (tabsCount !== panelsCount) {
    error = new Error('There should be an equal number of \'Tab\' and \'TabPanel\' in `' + componentName + '`.' + ('Received ' + tabsCount + ' \'Tab\' and ' + panelsCount + ' \'TabPanel\'.'));
  }

  return error;
}

function onSelectPropType(props, propName, componentName, location, propFullName) {
  var prop = props[propName];
  var name = propFullName || propName;
  var error = null;

  if (prop && typeof prop !== 'function') {
    error = new Error('Invalid ' + location + ' `' + name + '` of type `' + (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) + '` supplied to `' + componentName + '`, expected `function`.');
  } else if (props.selectedIndex != null && prop == null) {
    error = new Error('The ' + location + ' `' + name + '` is marked as required in `' + componentName + '`, but its value is `undefined` or `null`.\n`onSelect` is required when `selectedIndex` is also set. Not doing so will make the tabs not do anything, as `selectedIndex` indicates that you want to handle the selected tab yourself.\nIf you only want to set the inital tab replace `selectedIndex` with `defaultIndex`.');
  }

  return error;
}

function selectedIndexPropType(props, propName, componentName, location, propFullName) {
  var prop = props[propName];
  var name = propFullName || propName;
  var error = null;

  if (prop != null && typeof prop !== 'number') {
    error = new Error('Invalid ' + location + ' `' + name + '` of type `' + (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) + '` supplied to `' + componentName + '`, expected `number`.');
  } else if (props.defaultIndex != null && prop != null) {
    return new Error('The ' + location + ' `' + name + '` cannot be used together with `defaultIndex` in `' + componentName + '`.\nEither remove `' + name + '` to let `' + componentName + '` handle the selected tab internally or remove `defaultIndex` to handle it yourself.');
  }

  return error;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes3 = __webpack_require__(8);

var _UncontrolledTabs = __webpack_require__(10);

var _UncontrolledTabs2 = _interopRequireDefault(_UncontrolledTabs);

var _count = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleSelected = function (index, last, event) {
      var state = {
        // Set focus if the change was triggered from the keyboard
        focus: event.type === 'keydown'
      };

      // Call change event handler
      if (typeof _this.props.onSelect === 'function') {
        // Check if the change event handler cancels the tab change
        if (_this.props.onSelect(index, last, event) === false) return;
      }

      if (Tabs.inUncontrolledMode(_this.props)) {
        // Update selected index
        state.selectedIndex = index;
      }

      _this.setState(state);
    };

    _this.state = Tabs.copyPropsToState(_this.props, {});
    return _this;
  }

  Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if ("development" !== 'production' && Tabs.inUncontrolledMode(newProps) !== Tabs.inUncontrolledMode(this.props)) {
      throw new Error('Switching between controlled mode (by using `selectedIndex`) and uncontrolled mode is not supported in `Tabs`.\nFor more information about controlled and uncontrolled mode of react-tabs see the README.');
    }
    // Use a transactional update to prevent race conditions
    // when reading the state in copyPropsToState
    // See https://github.com/reactjs/react-tabs/issues/51
    this.setState(function (state) {
      return Tabs.copyPropsToState(newProps, state);
    });
  };

  Tabs.inUncontrolledMode = function inUncontrolledMode(props) {
    return props.selectedIndex === null;
  };

  // preserve the existing selectedIndex from state.
  // If the state has not selectedIndex, default to the defaultIndex or 0
  Tabs.copyPropsToState = function copyPropsToState(props, state) {
    var newState = {
      focus: state.focus || props.defaultFocus
    };

    if (Tabs.inUncontrolledMode(props)) {
      var maxTabIndex = (0, _count.getTabsCount)(props.children) - 1;
      var selectedIndex = null;

      if (state.selectedIndex != null) {
        selectedIndex = Math.min(state.selectedIndex, maxTabIndex);
      } else {
        selectedIndex = props.defaultIndex || 0;
      }
      newState.selectedIndex = selectedIndex;
    }

    return newState;
  };

  Tabs.prototype.render = function render() {
    var _this2 = this;

    // This fixes an issue with focus management.
    //
    // Ultimately, when focus is true, and an input has focus,
    // and any change on that input causes a state change/re-render,
    // focus gets sent back to the active tab, and input loses focus.
    //
    // Since the focus state only needs to be remembered
    // for the current render, we can reset it once the
    // render has happened.
    //
    // Don't use setState, because we don't want to re-render.
    //
    // See https://github.com/reactjs/react-tabs/pull/7
    if (this.state.focus) {
      setTimeout(function () {
        _this2.state.focus = false;
      }, 0);
    }

    var _props = this.props,
        children = _props.children,
        defaultIndex = _props.defaultIndex,
        defaultFocus = _props.defaultFocus,
        props = _objectWithoutProperties(_props, ['children', 'defaultIndex', 'defaultFocus']);

    props.focus = this.state.focus;
    props.onSelect = this.handleSelected;

    if (this.state.selectedIndex != null) {
      props.selectedIndex = this.state.selectedIndex;
    }

    return _react2.default.createElement(
      _UncontrolledTabs2.default,
      props,
      children
    );
  };

  return Tabs;
}(_react.Component);

Tabs.defaultProps = {
  defaultFocus: false,
  forceRenderTabPanel: false,
  selectedIndex: null,
  defaultIndex: null
};
exports.default = Tabs;
 true ? Tabs.propTypes = {
  children: _propTypes3.childrenPropType,
  className: _propTypes2.default.string,
  defaultFocus: _propTypes2.default.bool,
  defaultIndex: _propTypes2.default.number,
  forceRenderTabPanel: _propTypes2.default.bool,
  onSelect: _propTypes3.onSelectPropType,
  selectedIndex: _propTypes3.selectedIndexPropType
} : void 0;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _propTypes3 = __webpack_require__(8);

var _Tab = __webpack_require__(1);

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = __webpack_require__(3);

var _TabList2 = _interopRequireDefault(_TabList);

var _TabPanel = __webpack_require__(4);

var _TabPanel2 = _interopRequireDefault(_TabPanel);

var _count = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
  return node.getAttribute('aria-disabled') === 'true';
}

var UncontrolledTabs = function (_Component) {
  _inherits(UncontrolledTabs, _Component);

  function UncontrolledTabs() {
    var _temp, _this, _ret;

    _classCallCheck(this, UncontrolledTabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.tabNodes = [], _this.handleKeyDown = function (e) {
      if (_this.isTabFromContainer(e.target)) {
        var index = _this.props.selectedIndex;
        var preventDefault = false;

        if (e.keyCode === 37 || e.keyCode === 38) {
          // Select next tab to the left
          index = _this.getPrevTab(index);
          preventDefault = true;
        } else if (e.keyCode === 39 || e.keyCode === 40) {
          // Select next tab to the right
          index = _this.getNextTab(index);
          preventDefault = true;
        }

        // This prevents scrollbars from moving around
        if (preventDefault) {
          e.preventDefault();
        }

        _this.setSelected(index, e);
      }
    }, _this.handleClick = function (e) {
      var node = e.target;
      do {
        // eslint-disable-line no-cond-assign
        if (_this.isTabFromContainer(node)) {
          if (isTabDisabled(node)) {
            return;
          }

          var index = [].slice.call(node.parentNode.children).filter(isTabNode).indexOf(node);
          _this.setSelected(index, e);
          return;
        }
      } while ((node = node.parentNode) !== null);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UncontrolledTabs.prototype.setSelected = function setSelected(index, event) {
    // Don't do anything if nothing has changed
    if (index === this.props.selectedIndex) return;
    // Check index boundary
    if (index < 0 || index >= this.getTabsCount()) return;

    // Call change event handler
    this.props.onSelect(index, this.props.selectedIndex, event);
  };

  UncontrolledTabs.prototype.getNextTab = function getNextTab(index) {
    var count = this.getTabsCount();

    // Look for non-disabled tab from index to the last tab on the right
    for (var i = index + 1; i < count; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (var _i = 0; _i < index; _i++) {
      if (!isTabDisabled(this.getTab(_i))) {
        return _i;
      }
    }

    // No tabs are disabled, return index
    return index;
  };

  UncontrolledTabs.prototype.getPrevTab = function getPrevTab(index) {
    var i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.getTabsCount();
    while (i-- > index) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  };

  UncontrolledTabs.prototype.getTabsCount = function getTabsCount() {
    return (0, _count.getTabsCount)(this.props.children);
  };

  UncontrolledTabs.prototype.getPanelsCount = function getPanelsCount() {
    return (0, _count.getPanelsCount)(this.props.children);
  };

  UncontrolledTabs.prototype.getTab = function getTab(index) {
    return this.tabNodes['tabs-' + index];
  };

  UncontrolledTabs.prototype.getChildren = function getChildren() {
    var _this2 = this;

    var index = 0;
    var children = this.props.children;
    this.tabIds = this.tabIds || [];
    this.panelIds = this.panelIds || [];
    var diff = this.tabIds.length - this.getTabsCount();

    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      this.tabIds.push((0, _uuid2.default)());
      this.panelIds.push((0, _uuid2.default)());
    }

    // Map children to dynamically setup refs
    return _react2.default.Children.map(children, function (child) {
      // null happens when conditionally rendering TabPanel/Tab
      // see https://github.com/reactjs/react-tabs/issues/37
      if (child === null) {
        return null;
      }

      var result = child;

      // Clone TabList and Tab components to have refs
      if (child.type === _TabList2.default) {
        var listIndex = 0;
        // TODO try setting the uuid in the "constructor" for `Tab`/`TabPanel`
        result = (0, _react.cloneElement)(child, {
          children: _react2.default.Children.map(child.props.children, function (tab) {
            // null happens when conditionally rendering TabPanel/Tab
            // see https://github.com/reactjs/react-tabs/issues/37
            if (tab === null) {
              return null;
            }

            // Exit early if this is not a tab. That way we can have arbitrary
            // elements anywhere inside <TabList>
            if (tab.type !== _Tab2.default) return tab;

            var key = 'tabs-' + listIndex;
            var tabRef = function tabRef(node) {
              _this2.tabNodes[key] = node;
            };
            var id = _this2.tabIds[listIndex];
            var panelId = _this2.panelIds[listIndex];
            var selected = _this2.props.selectedIndex === listIndex;
            var focus = selected && _this2.props.focus;

            listIndex++;

            return (0, _react.cloneElement)(tab, {
              tabRef: tabRef,
              id: id,
              panelId: panelId,
              selected: selected,
              focus: focus
            });
          })
        });
      } else if (child.type === _TabPanel2.default) {
        var id = _this2.panelIds[index];
        var tabId = _this2.tabIds[index];
        var selected = _this2.props.selectedIndex === index;
        var forceRenderTabPanel = _this2.props.forceRenderTabPanel;

        index++;

        result = (0, _react.cloneElement)(child, {
          id: id,
          tabId: tabId,
          selected: selected,
          forceRenderTabPanel: forceRenderTabPanel
        });
      }

      return result;
    });
  };

  /**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */
  UncontrolledTabs.prototype.isTabFromContainer = function isTabFromContainer(node) {
    // return immediately if the clicked element is not a Tab.
    if (!isTabNode(node)) {
      return false;
    }

    // Check if the first occurrence of a Tabs container is `this` one.
    var nodeAncestor = node.parentElement;
    do {
      if (nodeAncestor === this.node) return true;else if (nodeAncestor.getAttribute('data-tabs')) break;

      nodeAncestor = nodeAncestor.parentElement;
    } while (nodeAncestor);

    return false;
  };

  UncontrolledTabs.prototype.render = function render() {
    var _this3 = this;

    // Delete all known props, so they don't get added to DOM
    var _props = this.props,
        className = _props.className,
        selectedIndex = _props.selectedIndex,
        onSelect = _props.onSelect,
        focus = _props.focus,
        children = _props.children,
        forceRenderTabPanel = _props.forceRenderTabPanel,
        attributes = _objectWithoutProperties(_props, ['className', 'selectedIndex', 'onSelect', 'focus', 'children', 'forceRenderTabPanel']);

    return _react2.default.createElement(
      'div',
      _extends({}, attributes, {
        className: (0, _classnames2.default)('ReactTabs', 'react-tabs', className),
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        ref: function ref(node) {
          _this3.node = node;
        },
        'data-tabs': true
      }),
      this.getChildren()
    );
  };

  return UncontrolledTabs;
}(_react.Component);

UncontrolledTabs.defaultProps = {
  className: '',
  focus: false,
  forceRenderTabPanel: false
};
exports.default = UncontrolledTabs;
 true ? UncontrolledTabs.propTypes = {
  children: _propTypes3.childrenPropType,
  className: _propTypes2.default.string,
  focus: _propTypes2.default.bool,
  forceRenderTabPanel: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func.isRequired,
  selectedIndex: _propTypes2.default.number.isRequired
} : void 0;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.resetIdCounter = exports.Tabs = exports.TabPanel = exports.TabList = exports.Tab = undefined;

var _Tabs = __webpack_require__(9);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TabList = __webpack_require__(3);

var _TabList2 = _interopRequireDefault(_TabList);

var _Tab = __webpack_require__(1);

var _Tab2 = _interopRequireDefault(_Tab);

var _TabPanel = __webpack_require__(4);

var _TabPanel2 = _interopRequireDefault(_TabPanel);

var _uuid = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Tab = _Tab2.default;
exports.TabList = _TabList2.default;
exports.TabPanel = _TabPanel2.default;
exports.Tabs = _Tabs2.default;
exports.resetIdCounter = _uuid.reset;

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-tabs.js.map
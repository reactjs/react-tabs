(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types", "classnames"], factory);
	else if(typeof exports === 'object')
		exports["ReactTabs"] = factory(require("react"), require("prop-types"), require("classnames"));
	else
		root["ReactTabs"] = factory(root["React"], root["PropTypes"], root["classNames"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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

    return _react2.default.createElement('li', _extends({}, attributes, {
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
    }), children);
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
Tab.propTypes = {
  activeTabClassName: _propTypes2.default.string,
  disabledTabClassName: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  focus: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  panelId: _propTypes2.default.string,
  selected: _propTypes2.default.bool,
  tabRef: _propTypes2.default.func
};
exports.default = Tab;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _Tab = __webpack_require__(1);

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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

    return _react2.default.createElement('ul', _extends({}, attributes, {
      className: (0, _classnames2.default)('ReactTabs__TabList', className),
      role: 'tablist'
    }), this.renderChildren());
  };

  return TabList;
}(_react.Component);

TabList.propTypes = {
  activeTabClassName: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  className: _propTypes2.default.string,
  disabledTabClassName: _propTypes2.default.string
};
exports.default = TabList;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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
        id = _props.id,
        selected = _props.selected,
        style = _props.style,
        tabId = _props.tabId,
        attributes = _objectWithoutProperties(_props, ['children', 'className', 'id', 'selected', 'style', 'tabId']);

    return _react2.default.createElement('div', _extends({}, attributes, {
      className: (0, _classnames2.default)('ReactTabs__TabPanel', className, {
        'ReactTabs__TabPanel--selected': selected
      }),
      role: 'tabpanel',
      id: id,
      'aria-labelledby': tabId,
      style: _extends({}, style, { display: selected ? null : 'none' })
    }), this.context.forceRenderTabPanel || selected ? children : null);
  };

  return TabPanel;
}(_react.Component);

TabPanel.contextTypes = {
  forceRenderTabPanel: _propTypes2.default.bool
};
TabPanel.defaultProps = {
  id: null,
  selected: false,
  tabId: null
};
TabPanel.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  selected: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  tabId: _propTypes2.default.string
};
exports.default = TabPanel;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(3);

var _classnames2 = _interopRequireDefault(_classnames);

var _uuid = __webpack_require__(8);

var _uuid2 = _interopRequireDefault(_uuid);

var _childrenPropType = __webpack_require__(7);

var _childrenPropType2 = _interopRequireDefault(_childrenPropType);

var _Tab = __webpack_require__(1);

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
  return node.getAttribute('aria-disabled') === 'true';
}

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.tabNodes = [];

    _this.handleKeyDown = function (e) {
      if (_this.isTabFromContainer(e.target)) {
        var index = _this.state.selectedIndex;
        var preventDefault = false;

        // Select next tab to the left
        if (e.keyCode === 37 || e.keyCode === 38) {
          index = _this.getPrevTab(index);
          preventDefault = true;
        }
        // Select next tab to the right
        /* eslint brace-style:0 */
        else if (e.keyCode === 39 || e.keyCode === 40) {
            index = _this.getNextTab(index);
            preventDefault = true;
          }

        // This prevents scrollbars from moving around
        if (preventDefault) {
          e.preventDefault();
        }

        _this.setSelected(index, true);
      }
    };

    _this.handleClick = function (e) {
      var node = e.target;
      do {
        // eslint-disable-line no-cond-assign
        if (_this.isTabFromContainer(node)) {
          if (isTabDisabled(node)) {
            return;
          }

          var index = [].slice.call(node.parentNode.children).indexOf(node);
          _this.setSelected(index);
          return;
        }
      } while ((node = node.parentNode) !== null);
    };

    _this.state = Tabs.copyPropsToState(_this.props, _this.state);
    return _this;
  }

  Tabs.prototype.getChildContext = function getChildContext() {
    return {
      forceRenderTabPanel: this.props.forceRenderTabPanel
    };
  };

  Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    // Use a transactional update to prevent race conditions
    // when reading the state in copyPropsToState
    // See https://github.com/reactjs/react-tabs/issues/51
    this.setState(function (state) {
      return Tabs.copyPropsToState(newProps, state);
    });
  };

  Tabs.prototype.setSelected = function setSelected(index, focus) {
    // Don't do anything if nothing has changed
    if (index === this.state.selectedIndex) return;
    // Check index boundary
    if (index < 0 || index >= this.getTabsCount()) return;

    // Keep reference to last index for event handler
    var last = this.state.selectedIndex;

    // Check if the change event handler cancels the tab change
    var cancel = false;

    // Call change event handler
    if (typeof this.props.onSelect === 'function') {
      cancel = this.props.onSelect(index, last) === false;
    }

    if (!cancel) {
      // Update selected index
      this.setState({ selectedIndex: index, focus: focus === true });
    }
  };

  Tabs.prototype.getNextTab = function getNextTab(index) {
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

  Tabs.prototype.getPrevTab = function getPrevTab(index) {
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

  Tabs.prototype.getTabsCount = function getTabsCount() {
    return this.props.children && this.props.children[0] ? _react2.default.Children.count(this.props.children[0].props.children) : 0;
  };

  Tabs.prototype.getPanelsCount = function getPanelsCount() {
    return _react2.default.Children.count(this.props.children.slice(1));
  };

  Tabs.prototype.getTab = function getTab(index) {
    return this.tabNodes['tabs-' + index];
  };

  Tabs.prototype.getChildren = function getChildren() {
    var _this2 = this;

    var index = 0;
    var count = 0;
    var children = this.props.children;
    var state = this.state;
    var tabIds = this.tabIds = this.tabIds || [];
    var panelIds = this.panelIds = this.panelIds || [];
    var diff = this.tabIds.length - this.getTabsCount();

    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      tabIds.push((0, _uuid2.default)());
      panelIds.push((0, _uuid2.default)());
    }

    // Map children to dynamically setup refs
    return _react2.default.Children.map(children, function (child) {
      // null happens when conditionally rendering TabPanel/Tab
      // see https://github.com/reactjs/react-tabs/issues/37
      if (child === null) {
        return null;
      }

      var result = null;

      // Clone TabList and Tab components to have refs
      if (count++ === 0) {
        // TODO try setting the uuid in the "constructor" for `Tab`/`TabPanel`
        result = (0, _react.cloneElement)(child, {
          children: _react2.default.Children.map(child.props.children, function (tab) {
            // null happens when conditionally rendering TabPanel/Tab
            // see https://github.com/reactjs/react-tabs/issues/37
            if (tab === null) {
              return null;
            }

            var tabRef = function tabRef(node) {
              _this2.tabNodes['tabs-' + index] = node;
            };
            var id = tabIds[index];
            var panelId = panelIds[index];
            var selected = state.selectedIndex === index;
            var focus = selected && state.focus;

            index++;

            if (tab.type === _Tab2.default) {
              return (0, _react.cloneElement)(tab, {
                tabRef: tabRef,
                id: id,
                panelId: panelId,
                selected: selected,
                focus: focus
              });
            }

            return tab;
          })
        });

        // Reset index for panels
        index = 0;
      } else {
        var id = panelIds[index];
        var tabId = tabIds[index];
        var selected = state.selectedIndex === index;

        index++;

        result = (0, _react.cloneElement)(child, {
          id: id,
          tabId: tabId,
          selected: selected
        });
      }

      return result;
    });
  };

  // This is an anti-pattern, so sue me
  Tabs.copyPropsToState = function copyPropsToState(props, state) {
    var selectedIndex = props.selectedIndex;

    // If no selectedIndex prop was supplied, then try
    // preserving the existing selectedIndex from state.
    // If the state has not selectedIndex, default
    // to the first tab in the TabList.
    //
    // TODO: Need automation testing around this
    // Manual testing can be done using examples/focus
    // See 'should preserve selectedIndex when typing' in specs/Tabs.spec.js
    if (selectedIndex === -1) {
      if (state && state.selectedIndex) {
        selectedIndex = state.selectedIndex;
      } else {
        selectedIndex = 0;
      }
    }

    return {
      selectedIndex: selectedIndex,
      focus: props.focus
    };
  };

  /**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */

  Tabs.prototype.isTabFromContainer = function isTabFromContainer(node) {
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

  Tabs.prototype.render = function render() {
    var _this3 = this;

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
        _this3.state.focus = false;
      }, 0);
    }

    var _props = this.props,
        className = _props.className,
        attributes = _objectWithoutProperties(_props, ['className']);

    // Delete all known props, so they don't get added to DOM


    delete attributes.selectedIndex;
    delete attributes.onSelect;
    delete attributes.focus;
    delete attributes.children;
    delete attributes.forceRenderTabPanel;
    delete attributes.onClick;
    delete attributes.onKeyDown;

    return _react2.default.createElement('div', _extends({}, attributes, {
      className: (0, _classnames2.default)('ReactTabs', 'react-tabs', className),
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      ref: function ref(node) {
        _this3.node = node;
      },
      'data-tabs': true
    }), this.getChildren());
  };

  return Tabs;
}(_react.Component);

Tabs.childContextTypes = {
  forceRenderTabPanel: _propTypes2.default.bool
};
Tabs.defaultProps = {
  focus: false,
  forceRenderTabPanel: false,
  selectedIndex: -1
};
Tabs.propTypes = {
  children: _childrenPropType2.default,
  className: _propTypes2.default.string,
  focus: _propTypes2.default.bool, // eslint-disable-line react/no-unused-prop-types
  forceRenderTabPanel: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func,
  selectedIndex: _propTypes2.default.number };
exports.default = Tabs;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Tab = __webpack_require__(1);

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = __webpack_require__(4);

var _TabList2 = _interopRequireDefault(_TabList);

var _TabPanel = __webpack_require__(5);

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = function childrenPropTypes(props, propName) {
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
      error = new Error('Expected \'TabList\' or \'TabPanel\' but found \'' + (child.type.displayName || child.type) + '\'');
    }
  });

  if (tabsCount !== panelsCount) {
    error = new Error("There should be an equal number of 'Tabs' and 'TabPanels'." + ('Received ' + tabsCount + ' \'Tabs\' and ' + panelsCount + ' \'TabPanels\'.'));
  }

  return error;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Get a universally unique identifier

var count = 0;
module.exports = function uuid() {
  return "react-tabs-" + count++;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Tabs = exports.TabPanel = exports.TabList = exports.Tab = undefined;

var _Tabs = __webpack_require__(6);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TabList = __webpack_require__(4);

var _TabList2 = _interopRequireDefault(_TabList);

var _Tab = __webpack_require__(1);

var _Tab2 = _interopRequireDefault(_Tab);

var _TabPanel = __webpack_require__(5);

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.Tab = _Tab2.default;
exports.TabList = _TabList2.default;
exports.TabPanel = _TabPanel2.default;
exports.Tabs = _Tabs2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-tabs.js.map
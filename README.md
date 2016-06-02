# react-tabs [![Build Status](https://travis-ci.org/reactjs/react-tabs.svg?branch=master)](https://travis-ci.org/reactjs/react-tabs)

React tabs component

## Installing

```bash
$ npm install react-tabs
```

## Demo

https://reactcommunity.org/react-tabs/example/

## Example

```js
var React = require('react');
var ReactDOM = require('react-dom');
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var App = React.createClass({
  getInitialState: function () {
    return { selectedTab: 2 };
  },

  handleSelect: function (index) {
    this.setState({ selectedTab: index });
  },

  render: function () {
    return (
      {/*
        <Tabs/> is a composite component and acts as the main container.

        `selectedIndex` is the currently selected tab.

        `onSelect` is a callback invoked whenever a user clicks on or
        keyboard-navigates to a tab. It is passed the index of the selected tab.

        If you provide a `selectedIndex`, you should always provide an `onSelect`
        (and vice versa) so that you can update the `selectedIndex` in response to
        user interactions. If you pass neither of these props, then the component's
        default "uncontrolled" behavior is to automatically update its selectedIndex
        to whatever would be passed to the onSelect handler. I.e., it behaves as
        you'd expect.

        `forceRenderTabPanel` By default this react-tabs will only render the selected
        tab's contents. Setting `forceRenderTabPanel` to `true` allows you to override the
        default behavior, which may be useful in some circumstances (such as animating between tabs).

      */}

      <Tabs
        onSelect={this.handleSelect}
        selectedIndex={this.state.selectedTab}
      >

        {/*
          <TabList/> is a composit component and is the container for the <Tab/>s.
        */}

        <TabList>

          {/*
            <Tab/> is the actual tab component that users will interact with.

            Selecting a tab can be done by either clicking with the mouse,
            or by using the keyboard tab to give focus then navigating with
            the arrow keys (right/down to select tab to the right of selected,
            left/up to select tab to the left of selected).

            The content of the <Tab/> (this.props.children) will be shown as the label.
          */}

          <Tab>Foo</Tab>
          <Tab>Bar</Tab>
          <Tab>Baz</Tab>
        </TabList>

        {/*
          <TabPanel/> is the content for the tab.

          There should be an equal number of <Tab/> and <TabPanel/> components.
          <Tab/> and <TabPanel/> components are tied together by the order in
          which they appear. The first (index 0) <Tab/> will be associated with
          the <TabPanel/> of the same index. Running this example when
          `selectedIndex` is 0 the tab with the label "Foo" will be selected
          and the content shown will be "Hello from Foo".

          As with <Tab/> the content of <TabPanel/> will be shown as the content.
        */}

        <TabPanel>
          <h2>Hello from Foo</h2>
        </TabPanel>
        <TabPanel>
          <h2>Hello from Bar</h2>
        </TabPanel>
        <TabPanel>
          <h2>Hello from Baz</h2>
        </TabPanel>
      </Tabs>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('container'));

```

## License

MIT

#  A fork of [react-tabs](https://github.com/reactjs/react-tabs) which supports server side rendering

The current version of react tabs cannot be used for server side rendering. Check the issue here - [#56](https://github.com/reactjs/react-tabs/issues/56)

This is a hacky fix to get it working by passing a custom id generation function to the `<Tabs>` component, which does not use a stateful counter to assign ids to the children of `<Tabs>`

It isn't the ideal solution, but till the original authors have a better idea, this seems like the only way to get it working.

> Supports React ^0.14.0 or ^15.0.0

## Installing

```bash
$ npm install react-tabs-isomorphic --save
```

## Example

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

let idCounter = 0;
const generateIds = () => `custom-id-${idCounter++}`

class App extends Component {
  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    return (
      {/*
        <Tabs/> is a composite component and acts as the main container.

        `onSelect` is called whenever a tab is selected. The handler for
        this function will be passed the current index as well as the last index.

        `selectedIndex` is the tab to select when first rendered. By default
        the first (index 0) tab will be selected.

        `forceRenderTabPanel` By default this react-tabs will only render the selected
        tab's contents. Setting `forceRenderTabPanel` to `true` allows you to override the
        default behavior, which may be useful in some circumstances (such as animating between tabs).

      */}

      <Tabs
        onSelect={this.handleSelect}
        selectedIndex={2}
        generateIdsFn={generateIds}
      >

        {/*
          <TabList/> is a composite component and is the container for the <Tab/>s.
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
          the <TabPanel/> of the same index. When you run this example with
          `selectedIndex` equal to 0, the tab with the label "Foo" will be selected
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
}

render(<App/>, document.getElementById('container'));
```

## License

MIT

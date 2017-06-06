import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from '../../lib/main';

const App = React.createClass({

  getInitialState() {
    return { value: 0 };
  },

  handleChange(index) {
    this.setState({ value: index + 1 });
    this.forceUpdate(() => {});
  },

  render() {
    return (
      <div>
        <div style={{borderBottom: '1px solid #666', marginBottom: 20}}>{this.state.value}</div>
        <div style={{padding: 50}}>
          <Tabs onSelect={this.handleChange}>
            <TabList>
              <Tab>First</Tab>
              <Tab>Second</Tab>
              <Tab>Third</Tab>
              <Tab>Fourth</Tab>
            </TabList>
            <TabPanel><p>First Content</p></TabPanel>
            <TabPanel><p>Second content</p></TabPanel>
            <TabPanel><p>Third content</p></TabPanel>
            <TabPanel><p>Fourth content</p></TabPanel>
          </Tabs>
        </div>
      </div>
	);
  }
});

ReactDOM.render(<App/>, document.getElementById('example'));

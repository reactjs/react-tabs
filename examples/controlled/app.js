import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from '../../lib/main';

const App = React.createClass({
  handleInputChange() {
    this.forceUpdate();
  },

  getInitialState() {
    return {currentTab: 1};
  },

  handleTabSelect(index) {
    this.setState({currentTab: index});
  },

  render() {
    return (
      <div style={{padding: 50}}>
        <button style={{marginBottom: 20}}
          onClick={this.swapTab}>Select other tab</button>
        <Tabs
          selectedIndex={this.state.currentTab}
          onSelect={this.handleTabSelect}
        >
          <TabList>
            <Tab>First</Tab>
            <Tab>Second</Tab>
          </TabList>
          <TabPanel>
            <p>This is the first tab, but not the default.</p>
          </TabPanel>
          <TabPanel>
            <p>This is the default tab.</p>
            <input
              type="text"
              onChange={this.handleInputChange}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  },

  swapTab() {
    this.setState({currentTab: (this.state.currentTab + 1) % 2});
  }
});

ReactDOM.render(<App/>, document.getElementById('example'));

import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from '../../lib/main';

const App = React.createClass({
  handleInputChange() {
    this.forceUpdate();
  },

  render() {
    return (
      <div style={{padding: 50}}>
        <Tabs>
          <TabList>
            <Tab>First</Tab>
            <Tab>Second</Tab>
          </TabList>
          <TabPanel>
            <p>Tab to focus `First`, then arrow to select `Second`.</p>
          </TabPanel>
          <TabPanel>
            <p>Tab to focus input, then begin typing. Focus should stay.</p>
            <input
              type="text"
              onChange={this.handleInputChange}
            />
          </TabPanel>
        </Tabs>
      </div>
	);
  }
});

ReactDOM.render(<App/>, document.getElementById('example'));

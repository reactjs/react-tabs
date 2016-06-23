import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from '../../src/main';

const App = React.createClass({
  getInitialState() {
    return { inputValue: '' };
  },

  handleInputChange(e) {
    this.forceUpdate();
    this.setState({ inputValue: e.target.value });
  },

  render() {
    return (
      <div style={{ padding: 50 }}>
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
              value={this.state.inputValue}
            />
          </TabPanel>
        </Tabs>
      </div>
	);
  },
});

ReactDOM.render(<App />, document.getElementById('example'));

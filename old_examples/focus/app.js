import React from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from '../../src/index';
import '../../style/react-tabs.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: '' };
  }

  handleInputChange = (e) => {
    this.forceUpdate();
    this.setState({ inputValue: e.target.value });
  }

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
  }
}

render(<App />, document.getElementById('example'));

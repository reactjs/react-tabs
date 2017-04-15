import React from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from '../../src/index';
import '../../style/react-tabs.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showA: true,
      showB: true,
      showC: true,
    };
  }

  handleCheckClicked = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <p>
          <label>
            <input type="checkbox" checked={this.state.showA} name="showA" onChange={this.handleCheckClicked} />
            Show A
          </label><br />
          <label>
            <input type="checkbox" checked={this.state.showB} name="showB" onChange={this.handleCheckClicked} />
            Show B
          </label><br />
          <label>
            <input type="checkbox" checked={this.state.showC} name="showC" onChange={this.handleCheckClicked} />
            Show C
          </label><br />
        </p>
        <Tabs>
          <TabList>
            {this.state.showA && <Tab>Tab A</Tab>}
            {this.state.showB && <Tab>Tab B</Tab>}
            {this.state.showC && <Tab>Tab C</Tab>}
          </TabList>
          {this.state.showA && <TabPanel>This is tab A</TabPanel>}
          {this.state.showB && <TabPanel>This is tab B</TabPanel>}
          {this.state.showC && <TabPanel>This is tab C</TabPanel>}
        </Tabs>
      </div>
    );
  }
}

render(<App />, document.getElementById('example'));


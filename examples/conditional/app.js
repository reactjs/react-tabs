import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from '../../lib/main';

const App = React.createClass({
  getInitialState() {
    return {
      showA: true,
      showB: true,
      showC: true
    };
  },

  handleCheckClicked(e) {
    const state = {};
    state[e.target.name] = e.target.checked;
    this.setState(state);
  },

  render() {
    return (
      <div style={{padding: 50}}>
        <p>
          <label>
            <input type="checkbox" checked={this.state.showA} name="showA" onChange={this.handleCheckClicked}/>
            Show A
          </label><br/>
          <label>
            <input type="checkbox" checked={this.state.showB} name="showB" onChange={this.handleCheckClicked}/>
            Show B
          </label><br/>
          <label>
            <input type="checkbox" checked={this.state.showC} name="showC" onChange={this.handleCheckClicked}/>
            Show C
          </label><br/>
        </p>
        <Tabs>
          <TabList>
            { this.state.showA && <Tab>Tab A</Tab> }
            { this.state.showB && <Tab>Tab B</Tab> }
            { this.state.showC && <Tab>Tab C</Tab> }
          </TabList>
          { this.state.showA && <TabPanel>This is tab A</TabPanel> }
          { this.state.showB && <TabPanel>This is tab B</TabPanel> }
          { this.state.showC && <TabPanel>This is tab C</TabPanel> }
        </Tabs>
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('example'));


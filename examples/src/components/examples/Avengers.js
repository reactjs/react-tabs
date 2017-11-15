import React from 'react';
import ExampleItem from '../ExampleItem';

const code = `class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isThorIn: false,
      isHulkIn: true,
      isIronmanIn: true
    };

    this.handleCheckClicked = this.handleCheckClicked.bind(this);
  }

  handleCheckClicked(e) {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  }

  render() {
    return (
      <div>
        <p>
          <label>
            <input type="checkbox" checked={this.state.isThorIn} name="isThorIn" onChange={this.handleCheckClicked} />
            Is Thor in?{'    '}
          </label>
          <label>
            <input type="checkbox" checked={this.state.isHulkIn} name="isHulkIn" onChange={this.handleCheckClicked} />
            Is Hulk in?{'    '}
          </label>
          <label>
            <input type="checkbox" checked={this.state.isIronmanIn} name="isIronmanIn" onChange={this.handleCheckClicked} />
            Is Ironman in?{'    '}
          </label>
        </p>
        <Tabs>
          <TabList>
            {this.state.isThorIn && <Tab><img src="https://i.imgur.com/JPxrE9A.png" alt="Thor" height="32" width="32" /></Tab>}
            {this.state.isHulkIn && <Tab><img src="https://i.imgur.com/x1Nzxl0.png" alt="Hulk" height="32" width="32" /></Tab>}
            {this.state.isIronmanIn && <Tab><img src="https://i.imgur.com/ItOwd8s.png" alt="Ironman" height="32" width="32" /></Tab>}
          </TabList>
          {this.state.isThorIn && <TabPanel>This is tab A</TabPanel>}
          {this.state.isHulkIn && <TabPanel>This is tab B</TabPanel>}
          {this.state.isIronmanIn && <TabPanel>This is tab C</TabPanel>}
        </Tabs>
      </div>
    );
  }
}

render(Component);`;

const hint = 'This example lets you disable or enable certain Tabs dynamically.';

export default () => <ExampleItem code={code} hint={hint} label="Avengers Example" />;

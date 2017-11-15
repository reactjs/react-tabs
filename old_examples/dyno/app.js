import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from '../../src/index';
import '../../style/react-tabs.css';

Modal.setAppElement(document.getElementById('example'));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedIndex: -1,
      tabs: [
        { label: 'Foo', content: 'This is foo' },
        { label: 'Bar', content: 'This is bar' },
        { label: 'Baz', content: 'This is baz' },
        { label: 'Zap', content: 'This is zap' },
      ],
    };
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  addTab = () => {
    const label = this.refs.label.value;
    const content = this.refs.content.value;

    this.setState({
      tabs: [
        ...this.state.tabs,
        { label, content },
      ],
      selectedIndex: this.state.tabs.length,
    });
    this.closeModal();
  }

  removeTab = (index) => {
    this.setState({
      tabs: this.state.tabs.filter((tab, i) => i !== index),
      selectedIndex: Math.max(this.state.selectedIndex - 1, 0),
    });
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <p>
          <button onClick={this.openModal}>+ Add</button>
        </p>
        <Tabs
          selectedIndex={this.state.selectedIndex}
          onSelect={selectedIndex => this.setState({ selectedIndex })}
        >
          <TabList>
            {this.state.tabs.map((tab, i) => (
              <Tab key={i}>
                {tab.label} <a href="#" onClick={() => this.removeTab(i)}>✕</a>
              </Tab>
            ))}
          </TabList>
          {this.state.tabs.map((tab, i) => <TabPanel key={i}>{tab.content}</TabPanel>)}
        </Tabs>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={{ width: 400, height: 350, margin: '0 auto' }}
          contentLabel="tabs"
        >
          <h2>Add a Tab</h2>
          <label htmlFor="label">Label:</label><br />
          <input id="label" type="text" ref="label" /><br /><br />
          <label htmlFor="content">Content:</label><br />
          <textarea id="content" ref="content" rows="10" cols="50" /><br /><br />
          <button onClick={this.addTab}>OK</button>{' '}
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    );
  }
}

render(<App />, document.getElementById('example'));

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from '../../lib/main';

Modal.setAppElement(document.getElementById('example'));
Modal.injectCSS();

const App = React.createClass({
  getInitialState() {
    return {
      isModalOpen: false,
      selectedIndex: -1,
      tabs: [
        {label: 'Foo', content: 'This is foo'},
        {label: 'Bar', content: 'This is bar'},
        {label: 'Baz', content: 'This is baz'},
        {label: 'Zap', content: 'This is zap'}
      ]
    };
  },

  render() {
    return (
      <div style={{padding: 50}}>
        <p>
          <button onClick={this.openModal}>+ Add</button>
        </p>
        <Tabs selectedIndex={this.state.selectedIndex}>
          <TabList>
            {this.state.tabs.map((tab, i) => {
              return (
                <Tab key={i}>
                  {tab.label} <a href="#" onClick={this.removeTab.bind(this, i)}>✕</a>
                </Tab>
              );
            })}
          </TabList>
          {this.state.tabs.map((tab, i) => {
            return <TabPanel key={i}>{tab.content}</TabPanel>;
          })}
        </Tabs>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={{width: 400, height: 350, margin: '0 auto'}}
        >
          <h2>Add a Tab</h2>
          <label htmlFor="label">Label:</label><br/>
          <input id="label" type="text" ref="label"/><br/><br/>
          <label htmlFor="content">Content:</label><br/>
          <textarea id="content" ref="content" rows="10" cols="50"></textarea><br/><br/>
          <button onClick={this.addTab}>OK</button>{' '}
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    );
  },

  openModal() {
    this.setState({
      isModalOpen: true
    });
  },

  closeModal() {
    this.setState({
      isModalOpen: false
    });
  },

  addTab() {
    const label = this.refs.label.value;
    const content = this.refs.content.value;

    this.state.tabs.push({
      label: label,
      content: content
    });
    this.setState({
      selectedIndex: this.state.tabs.length - 1
    });
    this.closeModal();
  },

  removeTab(index) {
    this.state.tabs.splice(index, 1);
    this.forceUpdate();
  }
});

ReactDOM.render(<App/>, document.getElementById('example'));

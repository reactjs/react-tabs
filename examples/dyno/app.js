/** @jsx React.DOM */
var React = require('react');
var Modal = require('react-modal');
var ReactTabs	= require('../../lib/main');
var Tab	= ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList	= ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

Modal.setAppElement(document.getElementById('example'));
Modal.injectCSS();

var App = React.createClass({
  getInitialState: function () {
    return {
      isModalOpen: false,
      tabs: [
        {label: 'Foo', content: 'This is foo'},
        {label: 'Bar', content: 'This is bar'},
        {label: 'Baz', content: 'This is baz'},
        {label: 'Zap', content: 'This is zap'}
      ]
    }
  },

  openModal: function () {
    this.setState({
      isModalOpen: true
    });
  },

  closeModal: function () {
    this.setState({
      isModalOpen: false
    });
  },

  addTab: function () {
    var label = this.refs.label.getDOMNode().value;
    var content = this.refs.content.getDOMNode().value;

    this.state.tabs.push({
      label: label,
      content: content
    });
    this.closeModal();
  },

  removeTab: function (index) {
    this.state.tabs.splice(index, 1);
    this.forceUpdate();
  },

  render: function () {
		return (
			<div style={{padding: 50}}>
        <p>
          <button onClick={this.openModal}>+ Add</button>
        </p>
        <Tabs>
					<TabList>
					  {this.state.tabs.map(function (tab, i) {
              return (
                <Tab key={i}>
                  {tab.label} <a href="javascript://" onClick={this.removeTab.bind(this, i)}>✕</a>
                </Tab>
              );
            }.bind(this))}
          </TabList>
          {this.state.tabs.map(function (tab, i) {
            return <TabPanel key={i}>{tab.content}</TabPanel>
          }.bind(this))}
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
	}
});

React.render(<App/>, document.getElementById('example'));



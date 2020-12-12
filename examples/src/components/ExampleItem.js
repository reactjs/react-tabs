import React, { Component } from 'react';
import T from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // eslint-disable-line
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import classNames from 'clsx';
import dracula from 'prism-react-renderer/themes/dracula';

const scope = { Tabs, Tab, TabList, TabPanel };

export default class ExampleItem extends Component {
  state = {
    editorOpen: false,
  };

  toggleCheckbox({ target: { name, checked } }) {
    this.setState({
      [name]: checked,
    });
  }

  handleEditSourceChange = () => {
    this.setState({
      editorOpen: !this.state.editorOpen,
    });
  };

  renderHint() {
    if (!this.props.hint) return null;

    return <div className="hint">{this.props.hint}</div>;
  }

  render() {
    const { editorOpen } = this.state;
    const editorClassNames = classNames('live-editor', {
      'live-editor--visible': editorOpen,
    });
    const formId = `editorOpen${this.props.label.replace(' ', '_')}`;

    return (
      <div className="section">
        <h3 className="section__heading">
          {this.props.label}{' '}
          <label className="source-checkbox-label" htmlFor={formId}>
            <input
              type="checkbox"
              id={formId}
              name={formId}
              checked={editorOpen}
              onChange={this.handleEditSourceChange}
            />
            View source
          </label>
        </h3>
        {this.renderHint()}
        <LiveProvider
          scope={scope}
          code={this.props.code}
          theme={dracula}
          noInline
        >
          <LiveError />
          <div className="live-preview">
            <div className={editorClassNames}>
              <LiveEditor />
            </div>
            <LivePreview
              className="react-live-preview"
              style={{ dir: this.props.direction === 'rtl' ? 'rtl' : 'ltr' }}
            />
          </div>
        </LiveProvider>
      </div>
    );
  }
}

ExampleItem.propTypes = {
  label: T.string.isRequired,
  hint: T.string.isRequired,
  code: T.string.isRequired,
};

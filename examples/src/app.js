import React from 'react';
import ReactDOM from 'react-dom';
import 'react-live/react-live.css';
import './example.less';
import SuperMario from './components/examples/SuperMario';
import MattGroening from './components/examples/MattGroening';
import Avengers from './components/examples/Avengers';

ReactDOM.render(
  <div>
    <SuperMario />
    <MattGroening />
    <Avengers />
  </div>,
  document.getElementById('example'),
);

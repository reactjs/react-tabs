import React from 'react';
import ReactDOM from 'react-dom';
import './example.less';
import SuperMario from './components/examples/SuperMario';
import MattGroening from './components/examples/MattGroening';
import Avengers from './components/examples/Avengers';
import RightToLeft from './components/examples/RightToLeft';

ReactDOM.render(
  <div>
    <SuperMario />
    <MattGroening />
    <Avengers />
    <RightToLeft />
  </div>,
  document.getElementById('example'),
);

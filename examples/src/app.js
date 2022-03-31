import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './example.less';
import SuperMario from './components/examples/SuperMario';
import MattGroening from './components/examples/MattGroening';
import Avengers from './components/examples/Avengers';
import RightToLeft from './components/examples/RightToLeft';

const root = ReactDOM.createRoot(document.getElementById('example'));

root.render(
  <div>
    <SuperMario />
    <MattGroening />
    <Avengers />
    <RightToLeft />
  </div>,
);

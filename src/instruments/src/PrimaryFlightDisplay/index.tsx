import React from 'react';
import { render } from 'instruments/common/Hooks';
import './index.scss';
import { PFDProvider } from './components/pfdProvider/pfdProvider';

const PrimaryFlightDisplay = () => {
  return (
    <div id="PFD-ROOT">
      <PFDProvider />
    </div>
  );
};

render(<PrimaryFlightDisplay />);

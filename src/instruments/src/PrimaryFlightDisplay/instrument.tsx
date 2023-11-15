/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />

import { FSComponent } from '@microsoft/msfs-sdk';
import { Horizon } from './components/horizon';

const ACE_CONTEXT = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE');

class PrimaryFlightDisplay extends BaseInstrument {
  get templateID(): string {
    return 'PrimaryFlightDisplay';
  }

  public connectedCallback(): void {
    super.connectedCallback();
    FSComponent.render(<Horizon />, document.getElementById(ACE_CONTEXT ? 'MSFS_REACT_MOUNT' : 'PrimaryFlightDisplay_CONTENT'));
  }
  public Update(): void {}
}

if (ACE_CONTEXT) {
  const instrument = new PrimaryFlightDisplay();
  instrument.connectedCallback();

  document.getElementById('ROOT_ELEMENT')?.addEventListener('update', () => instrument.Update());
} else {
  registerInstrument('primary-flight-display', PrimaryFlightDisplay);
}

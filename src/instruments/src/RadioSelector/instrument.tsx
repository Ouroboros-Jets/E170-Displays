/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />

import { FSComponent } from '@microsoft/msfs-sdk';
import { DisplayGrid } from './components/displayGrid';

const ACE_CONTEXT = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE');

class Clock extends BaseInstrument {
  get templateID(): string {
    return 'Clock';
  }

  public connectedCallback(): void {
    super.connectedCallback();
    FSComponent.render(
      <DisplayGrid display1Position="VHF1" display2Position="VHF1" display1Volume="100" display2Volume="100" />,
      document.getElementById(ACE_CONTEXT ? 'MSFS_REACT_MOUNT' : 'Clock_CONTENT'),
    );
  }
  public Update(): void {}
}

if (ACE_CONTEXT) {
  const instrument = new Clock();
  instrument.connectedCallback();

  document.getElementById('ROOT_ELEMENT')?.addEventListener('update', () => instrument.Update());
} else {
  registerInstrument('clock', Clock);
}

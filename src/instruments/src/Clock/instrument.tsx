/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />

import { EventBus, FSComponent, HEventPublisher } from '@microsoft/msfs-sdk';
import { ClockRoot } from './Components/ClockRoot';
import { ClockSimVarPublisher } from './Shared/ClockSimVarPublisher';

const ACE_CONTEXT = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE');

class Clock extends BaseInstrument {
  private bus: EventBus;

  private readonly hEventPublisher: HEventPublisher;

  private simVarPublisher: ClockSimVarPublisher;

  private gameState = 0;

  constructor() {
    super();
    this.bus = new EventBus();
    this.simVarPublisher = new ClockSimVarPublisher(this.bus);
    this.hEventPublisher = new HEventPublisher(this.bus);
  }

  get templateID(): string {
    return 'Clock';
  }

  public onInteractionEvent(_args: string[]): void {
    this.hEventPublisher.dispatchHEvent(_args[0]);
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.simVarPublisher.subscribe('absTime');

    this.simVarPublisher.subscribe('timeOfDay');

    this.simVarPublisher.subscribe('currentUTC');
    this.simVarPublisher.subscribe('dayOfMonth');
    this.simVarPublisher.subscribe('monthOfYear');
    this.simVarPublisher.subscribe('year');
    this.simVarPublisher.subscribe('clockPowered');

    FSComponent.render(<ClockRoot bus={this.bus} />, document.getElementById(ACE_CONTEXT ? 'MSFS_REACT_MOUNT' : 'Clock_CONTENT'));
  }
  public Update(): void {
    super.Update();

    if (this.gameState !== 3) {
      const gamestate = this.getGameState();
      if (gamestate === 3) {
        this.simVarPublisher.startPublish();
      }
      this.gameState = gamestate;
    } else {
      this.simVarPublisher.onUpdate();
    }
  }
}

if (ACE_CONTEXT) {
  const instrument = new Clock();
  instrument.connectedCallback();

  document.getElementById('ROOT_ELEMENT')?.addEventListener('update', () => instrument.Update());
} else {
  registerInstrument('clock', Clock);
}

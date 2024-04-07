/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent, EventBus, HEventPublisher } from '@microsoft/msfs-sdk'
import { PFDRoot } from './index'
import { PFDSimvarPublisher } from './Components/PFDSimVarPublisher'
import './index.scss'

const IsAce = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE')
const PFD_ID = 'PFD_CONTENT'

class E170_PFD extends BaseInstrument {
  private readonly bus: EventBus

  private readonly hEventPublisher: HEventPublisher
  private readonly simVarPublisher: PFDSimvarPublisher

  private gameState = 0

  constructor() {
    super()
    this.bus = new EventBus()
    this.simVarPublisher = new PFDSimvarPublisher(this.bus)
    this.hEventPublisher = new HEventPublisher(this.bus)
  }

  get templateID(): string {
    return 'E170_PFD'
  }

  public onInteractionEvent(args: string[]): void {
    this.hEventPublisher.dispatchHEvent(args[0])
  }

  public connectedCallback(): void {
    super.connectedCallback()

    this.simVarPublisher.startPublish()

    this.simVarPublisher.subscribe('bank')
    this.simVarPublisher.subscribe('pitch')

    FSComponent.render(<PFDRoot bus={this.bus} />, document.getElementById(PFD_ID))

    !IsAce && document.getElementById(PFD_ID)?.querySelector(':scope > h1')?.remove()

    /**
     * this is the worst code that has ever been written for the flight sim, however it works
     * it works quite well and that why its gonna stay
     * it will memory leak real bad in ace so we will protect against that
     */

    !IsAce &&
      setInterval(() => {
        this.Update()
      }, 50)
    this.Update()
  }

  public Update(): void {
    super.Update()
    if (this.gameState !== 3) {
      const gamestate = this.getGameState()
      if (gamestate === 3) {
        this.simVarPublisher.startPublish()
      }
      this.gameState = gamestate
    } else {
      this.simVarPublisher.onUpdate()
    }
  }
}

if (IsAce) {
  const instrument = new E170_PFD()

  const msfsReactMountDiv = document.getElementById('MSFS_REACT_MOUNT')
  if (msfsReactMountDiv) {
    msfsReactMountDiv.id = PFD_ID
  }
  instrument.connectedCallback()
  document.getElementById('ROOT_ELEMENT')?.addEventListener('update', () => {
    instrument.Update()
  })
} else {
  registerInstrument('pfd-element', E170_PFD)
}

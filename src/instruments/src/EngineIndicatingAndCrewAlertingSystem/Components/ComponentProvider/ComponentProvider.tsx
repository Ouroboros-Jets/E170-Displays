import React, { FC } from 'react';
import './ComponentProvider.scss';
import { APU } from '../APU/APU';
import { Cabin } from '../Cabin/cabin';
import { Engine } from '../Engine/engine';

type T_ComponentProviderProps = {
  declutter: boolean;
};

export const ComponentProvider: FC<T_ComponentProviderProps> = (props: T_ComponentProviderProps) => {
  return (
    <div className="component-provider-wrapper">
      <div className="component-provider-left">
        <div className="component-provider-engine">
          <Engine />
        </div>
        <div className="component-provider-fuel">Fuel</div>
        <div className={`component-provider-oil ${props.declutter ? 'declutter-hidden-left' : ''}`}>
          {props.declutter ? <div></div> : <div>oil</div>}
        </div>
        <div className={`component-provider-vib ${props.declutter ? 'declutter-hidden-left' : ''}`}>
          {props.declutter ? <div></div> : <div>vib</div>}
        </div>
        <div className={`component-provider-flaps ${props.declutter ? 'declutter-hidden-left' : ''}`}>
          {props.declutter ? <div></div> : <div>flaps</div>}
        </div>
      </div>
      <div className="component-provider-right">
        <div className="component-provider-cas">CAS MSG</div>
        <div className={`component-provider-lg ${props.declutter ? 'declutter-hidden-right' : ''}`}>
          {props.declutter ? <div></div> : <div>lg</div>}
        </div>
        <div className={`component-provider-apu`}>{props.declutter ? <div></div> : <APU />}</div>
        <div className="component-provider-cabin">
          <Cabin />
        </div>
        <div className="component-provider-trim">Trim</div>
      </div>
    </div>
  );
};

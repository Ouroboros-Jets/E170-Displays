import { Button } from './Button/Button';
import './buttonBar.scss';
import React from 'react';
import { AirportsIcon, FplIcon, HomeIcon, WnBIcon } from '../../icon/icon';
import { useObjLocalVar } from 'instruments/common/Hooks/simVars';

export const ButtonBar = () => {
  const [efbRoute, setEfbRoute] = useObjLocalVar('EFB_ROUTE', 'number', 400);
  return (
    <div className="buttonBar">
      <Button active={efbRoute === 0 ? true : false} text="Home" icon={<HomeIcon width={100} />} routeTo={0} />
      <Button text="Airports" active={efbRoute === 1 ? true : false} icon={<AirportsIcon width={100} />} routeTo={1} />
      <Button active={efbRoute === 2 ? true : false} text="Flight Plan" icon={<FplIcon width={100} />} routeTo={2} />
      <Button active={efbRoute === 3 ? true : false} text="Weight/Balance" icon={<WnBIcon width={100} />} routeTo={3} />
      <Button active={efbRoute === 4 ? true : false} text="Browser" icon={<WnBIcon width={100} />} routeTo={4} />
      <Button active={efbRoute === 5 ? true : false} text="Checklists" icon={<WnBIcon width={100} />} routeTo={5} />
      <Button active={efbRoute === 6 ? true : false} text="Weather" icon={<WnBIcon width={100} />} routeTo={6} />
      <Button active={efbRoute === 7 ? true : false} text="Scratchpads" icon={<WnBIcon width={100} />} routeTo={7} />
    </div>
  );
};

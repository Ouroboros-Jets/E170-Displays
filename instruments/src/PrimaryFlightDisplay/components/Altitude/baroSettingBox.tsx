import React, { FC } from 'react';

type T_baroSettingBox = {
  baroSetting?: number;
  invalid?: boolean;
  isStd?: boolean;
};

export const BaroSettingBox: FC<T_baroSettingBox> = (props: T_baroSettingBox): JSX.Element => {
  return (
    <g>
      <rect x="29" y="391" rx={2} ry={2} width="90" height="30" stroke="white" strokeWidth={2} fill="black" />
    </g>
  );
};

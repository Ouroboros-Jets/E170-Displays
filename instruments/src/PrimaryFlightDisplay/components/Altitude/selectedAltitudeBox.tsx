import React, { FC } from 'react';

type T_selectedAltitudeBox = {
  invalid?: boolean;
  altitude?: number;
};

export const SelectedAltitudeBox: FC<T_selectedAltitudeBox> = (props: T_selectedAltitudeBox): JSX.Element => {
  return (
    <g>
      <rect x="31" y="1" rx={2} ry={2} width="81" height="58" stroke="white" strokeWidth={2} fill="transparent" />
      <path d="M 31 27 L 112 27" stroke="white" strokeWidth="2" fill="none" />
    </g>
  );
};

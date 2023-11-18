import React, { FC } from 'react';

type T_FMAProps = {
  x: number;
  y: number;
};

export const FMA: FC<T_FMAProps> = (props: T_FMAProps): JSX.Element => {
  return (
    <div className="fma-container" style={{ left: props.x, top: props.y }}>
      FMA
    </div>
  );
};

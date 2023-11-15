import React, { FC } from 'react';

type T_CabinProps = {
  shit?: boolean;
};

export const Cabin: FC<T_CabinProps> = (): JSX.Element => {
  return (
    <div>
      <div>cabin</div>
    </div>
  );
};

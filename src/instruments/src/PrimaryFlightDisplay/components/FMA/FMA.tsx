import React, { FC } from 'react';
import { getStyleForATMode, GetStringForATMode, ATModeTypes } from './FMA_Annunciators';
import { reverseVideo } from 'instruments/common/util/reverseVideo';

export type FMAVars = {
  v_AT_Mode: number;
  v_AP_Status: number;
  v_Lateral_Mode: number;
  v_Vertical_Mode: number;
  v_Armed_AT_Mode: number;
  v_AT_Status: number;
  v_Armed_Lateral_Mode: number;
  v_Armed_Vertical_Mode: number;
  v_Selection_Source: number;
};

type T_FMAProps = {
  x: number;
  y: number;
  vars: FMAVars;
};

export const FMA: FC<T_FMAProps> = (props: T_FMAProps): JSX.Element => {
  const AT_Mode_ = props.vars.v_AT_Mode;
  const AP_Status_ = props.vars.v_AP_Status;
  const Lateral_Mode_ = props.vars.v_Lateral_Mode;
  const Vertical_Mode_ = props.vars.v_Vertical_Mode;
  const Armed_AT_Mode_ = props.vars.v_Armed_AT_Mode;
  const AT_Status_ = props.vars.v_AT_Status;
  const Armed_Lateral_Mode_ = props.vars.v_Armed_Lateral_Mode;
  const Armed_Vertical_Mode_ = props.vars.v_Armed_Vertical_Mode;
  const Selection_Source_ = props.vars.v_Selection_Source;

  /**
   * todo: add logic for reverse video, dependent on the mode for each box, the prop is a boolean and we will just pass true if the mode has reverse video
   */

  return (
    <div className="fma-container" style={{ left: props.x, top: props.y }}>
      <FMAGrid
        AT_Mode_Box={{
          backgroundColor: getStyleForATMode(AT_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(AT_Mode_)} mode={AT_Mode_} />,
        }}
        AP_Status_Box={{
          backgroundColor: getStyleForATMode(AP_Status_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(AP_Status_)} mode={AP_Status_} />,
        }}
        AP_AT_Source_box={{
          backgroundColor: getStyleForATMode(Selection_Source_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Selection_Source_)} mode={Selection_Source_} />,
        }}
        Lateral_Mode_Box={{
          backgroundColor: getStyleForATMode(Lateral_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Lateral_Mode_)} mode={Lateral_Mode_} />,
        }}
        Vertical_Mode_Box={{
          backgroundColor: getStyleForATMode(Vertical_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Vertical_Mode_)} mode={Vertical_Mode_} />,
        }}
        Armed_AT_Mode_Box={{
          backgroundColor: getStyleForATMode(Armed_AT_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Armed_AT_Mode_)} mode={Armed_AT_Mode_} />,
        }}
        AT_Status_Box={{
          backgroundColor: getStyleForATMode(AT_Status_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(AT_Status_)} mode={AT_Status_} />,
        }}
        Armed_Lateral_Mode_Box={{
          backgroundColor: getStyleForATMode(Armed_Lateral_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Armed_Lateral_Mode_)} mode={Armed_Lateral_Mode_} />,
        }}
        Armed_Vertical_Mode_Box={{
          backgroundColor: getStyleForATMode(Armed_Vertical_Mode_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Armed_Vertical_Mode_)} mode={Armed_Vertical_Mode_} />,
        }}
        Selection_Source_Box={{
          backgroundColor: getStyleForATMode(Selection_Source_).backgroundColor,
          element: <GetStringForATMode style={getStyleForATMode(Selection_Source_)} mode={Selection_Source_} />,
        }}
      />
    </div>
  );
};

type T_BoxProps = {
  backgroundColor: string;
  element: JSX.Element;
  reverseVideo?: boolean;
};

type T_FMAGridProps = {
  AT_Mode_Box: T_BoxProps;
  AP_Status_Box: T_BoxProps;
  AP_AT_Source_box: T_BoxProps;
  Lateral_Mode_Box: T_BoxProps;
  Vertical_Mode_Box: T_BoxProps;
  Armed_AT_Mode_Box: T_BoxProps;
  AT_Status_Box: T_BoxProps;
  Armed_Lateral_Mode_Box: T_BoxProps;
  Armed_Vertical_Mode_Box: T_BoxProps;
  Selection_Source_Box: T_BoxProps;
};

const FMAGrid: FC<T_FMAGridProps> = (props: T_FMAGridProps): JSX.Element => {
  const reversed: string = reverseVideo({ backgroundColor: 'red', color: 'red', reverse: false }).backgroundColor;
  return (
    <svg className="fma-grid" viewBox="0 0 100 100">
      <rect x="0" y="0" width="100" height="100" fill={'transparent'} />
    </svg>
  );
};

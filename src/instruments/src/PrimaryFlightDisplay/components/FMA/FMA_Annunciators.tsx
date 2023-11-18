import React, { FC } from 'react';

//naming convention: <NAME_OF_ANNUNCIATOR>_<SUBSCRIPT?>_<color w:white || g:lime || a:amber || rv:reverse video>
export enum ATModeTypes {
  TO_w,
  TO_g,
  HOLD_g,
  SPD_T_w,
  SPD_T_g,
  SPD_E_g,
  RETD_w,
  RETD_g,
  GA_g,
  LIM_a,
  AT_g,
  AT_g_rv,
  AT_r_rv,
  OVRD_g,
  DD_g,
}

type styleReturn = {
  color: string;
  backgroundColor: string;
  isReverseVideo: boolean;
};

export const getStyleForATMode = (mode: ATModeTypes): styleReturn => {
  switch (mode) {
    case ATModeTypes.TO_w:
      return { color: 'white', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.TO_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.HOLD_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.SPD_T_w:
      return { color: 'white', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.SPD_T_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.SPD_E_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.RETD_w:
      return { color: 'white', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.RETD_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.GA_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.LIM_a:
      return { color: 'amber', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.AT_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.AT_g_rv:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: true };
    case ATModeTypes.AT_r_rv:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: true };
    case ATModeTypes.OVRD_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.DD_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    default:
      return { color: 'transparent', backgroundColor: 'transparent', isReverseVideo: false };
  }
};

type T_FMAStringProps = {
  style: styleReturn;
  mode: ATModeTypes;
};

export const GetStringForATMode: FC<T_FMAStringProps> = (props: T_FMAStringProps): JSX.Element => {
  const textColor = props.style.color;
  switch (props.mode) {
    case ATModeTypes.TO_w:
      return <div style={{ color: textColor }}>TO</div>;
    case ATModeTypes.TO_g:
      return <div style={{ color: textColor }}>TO</div>;
    case ATModeTypes.HOLD_g:
      return <div style={{ color: textColor }}>HOLD</div>;
    case ATModeTypes.SPD_T_w:
      return (
        <div style={{ color: textColor }}>
          SPD<sub>T</sub>
        </div>
      );
    case ATModeTypes.SPD_T_g:
      return (
        <div style={{ color: textColor }}>
          SPD<sub>T</sub>
        </div>
      );
    case ATModeTypes.SPD_E_g:
      return (
        <div style={{ color: textColor }}>
          SPD<sub>E</sub>
        </div>
      );
    case ATModeTypes.RETD_w:
      return <div style={{ color: textColor }}>RETD</div>;
    case ATModeTypes.RETD_g:
      return <div style={{ color: textColor }}>RETD</div>;
    case ATModeTypes.GA_g:
      return <div style={{ color: textColor }}>GA</div>;
    case ATModeTypes.LIM_a:
      return <div style={{ color: textColor }}>LIM</div>;
    case ATModeTypes.AT_g:
      return <div style={{ color: textColor }}>AT</div>;
    case ATModeTypes.AT_g_rv:
      return <div style={{ color: textColor }}>AT</div>; // this will be reverse video but we will handle color in the parent
    case ATModeTypes.AT_r_rv:
      return <div style={{ color: textColor }}>AT</div>; // this will be reverse video but we will handle color in the parent
    case ATModeTypes.OVRD_g:
      return <div style={{ color: textColor }}>OVRD</div>;
    case ATModeTypes.DD_g:
      return <div style={{ color: textColor }}>DD</div>;
    default:
      return <div></div>;
  }
};

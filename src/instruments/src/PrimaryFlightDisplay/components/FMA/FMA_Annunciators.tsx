import React, { FC } from 'react';

/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * HANDLE ENUM OF EACH RESPECTIVE ANNUNCIATOR
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

//naming convention: <NAME_OF_ANNUNCIATOR>_<SUBSCRIPT?>_<color w:white || g:lime || a:amber || rv:reverse video>
export enum ATModeTypes {
  NONE,
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

export enum APStatusTypes {
  NONE,
}

export enum ArmedATModeTypes {
  NONE,
}

export enum ActiveLateralModeTypes {
  NONE,
}

export enum ActiveVerticalModeTypes {
  NONE,
}

export enum ArmedLateralModeTypes {
  NONE,
}

export enum ArmedVerticalModeTypes {
  NONE,
}

export enum SelectionSourceTypes {
  NONE,
}

/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * HANDLE STYLE OF EACH RESPECTIVE ANNUNCIATOR
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

type styleReturn = {
  color: string;
  backgroundColor: string;
  isReverseVideo: boolean;
};

export const getStyleForATMode = (
  mode:
    | ATModeTypes
    | APStatusTypes
    | APStatusTypes
    | ArmedATModeTypes
    | ActiveLateralModeTypes
    | ActiveVerticalModeTypes
    | ArmedLateralModeTypes
    | ArmedVerticalModeTypes
    | SelectionSourceTypes,
): styleReturn => {
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
      return { color: 'red', backgroundColor: 'transparent', isReverseVideo: true };
    case ATModeTypes.OVRD_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case ATModeTypes.DD_g:
      return { color: 'lime', backgroundColor: 'transparent', isReverseVideo: false };
    case APStatusTypes.NONE:
      return { color: 'transparent', backgroundColor: 'transparent', isReverseVideo: false };
    case ArmedATModeTypes.NONE:
      return { color: 'transparent', backgroundColor: 'transparent', isReverseVideo: false };
    case ActiveLateralModeTypes.NONE:
      return { color: 'transparent', backgroundColor: 'transparent', isReverseVideo: false };
    case ActiveVerticalModeTypes.NONE:
      return { color: 'transparent', backgroundColor: 'transparent', isReverseVideo: false };
    case ArmedLateralModeTypes.NONE:
      return { color: 'transparent', backgroundColor: 'transparent', isReverseVideo: false };
    case ArmedVerticalModeTypes.NONE:
      return { color: 'transparent', backgroundColor: 'transparent', isReverseVideo: false };
    case SelectionSourceTypes.NONE:
      return { color: 'transparent', backgroundColor: 'transparent', isReverseVideo: false };
    default:
      return { color: 'transparent', backgroundColor: 'transparent', isReverseVideo: false };
  }
};

/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * HANDLE STRING OF EACH RESPECTIVE ANNUNCIATOR
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

type T_FMAStringProps = {
  style: styleReturn;
  mode:
    | ATModeTypes
    | APStatusTypes
    | APStatusTypes
    | ArmedATModeTypes
    | ActiveLateralModeTypes
    | ActiveVerticalModeTypes
    | ArmedLateralModeTypes
    | ArmedVerticalModeTypes
    | SelectionSourceTypes;
  reverseVideo?: boolean;
  ovrdFontColor?: string;
};

export const GetStringForATMode: FC<T_FMAStringProps> = (props: T_FMAStringProps): JSX.Element => {
  const textColor = props.style.color;
  switch (props.mode) {
    case ATModeTypes.TO_w:
      return <tspan fill={textColor}>TO</tspan>;
    case ATModeTypes.TO_g:
      return <tspan fill={textColor}>TO</tspan>;
    case ATModeTypes.HOLD_g:
      return <tspan fill={textColor}>HOLD</tspan>;
    case ATModeTypes.SPD_T_w:
      return (
        <tspan fill={textColor}>
          SPD
          <tspan fontSize={20}>T</tspan>
        </tspan>
      );
    case ATModeTypes.SPD_T_g:
      return (
        <tspan fill={textColor}>
          SPD<tspan fontSize={20}>T</tspan>
        </tspan>
      );
    case ATModeTypes.SPD_E_g:
      return (
        <tspan fill={textColor}>
          SPD<tspan fontSize={20}>E</tspan>
        </tspan>
      );
    case ATModeTypes.RETD_w:
      return <tspan fill={textColor}>RETD</tspan>;
    case ATModeTypes.RETD_g:
      return <tspan fill={textColor}>RETD</tspan>;
    case ATModeTypes.GA_g:
      return <tspan fill={textColor}>GA</tspan>;
    case ATModeTypes.LIM_a:
      return <tspan fill={textColor}>LIM</tspan>;
    case ATModeTypes.AT_g:
      return <tspan fill={textColor}>AT</tspan>;
    case ATModeTypes.AT_g_rv:
      return <tspan fill={props.ovrdFontColor != null ? props.ovrdFontColor : textColor}>AT</tspan>;
    case ATModeTypes.AT_r_rv:
      return <tspan fill={props.ovrdFontColor != null ? props.ovrdFontColor : textColor}>AT</tspan>;
    case ATModeTypes.OVRD_g:
      return <tspan fill={textColor}>OVRD</tspan>;
    case ATModeTypes.DD_g:
      return <tspan fill={textColor}>DD</tspan>;
    default:
      return <tspan></tspan>;
  }
};

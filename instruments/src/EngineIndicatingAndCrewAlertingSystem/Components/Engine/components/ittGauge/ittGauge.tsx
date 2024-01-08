import React, { FC, useState, useEffect } from 'react';
import './ittGauge.scss';
import { getIttGaugeColor, limiter } from './ittGaugeColors';
import { findCoordsOnCircle } from '../gaugeUtil/gaugeUtil';

type T_ittGaugeProps = {
  ittValue: number;
  redlineValue: number;
  yellowLineValue: number;
  fire?: boolean;
  invalid?: boolean;
  left?: number;
  top?: number;
  hardLimit: number;
  scaling: number;
  amberColor: string;
  redColor: string;
  limeColor: string;
  yellowColor: string;
  fillerColor: string;
  forceRedInYellowTime: number;
};

/**
 * @param ittValue the current value of the gauge
 * @param redlineValue the redline value of the gauge
 * @param yellowLineValue the yellow line value of the gauge
 * @param fire if the gauge is on fire, it will display FIRE
 * @param invalid if the gauge is invalid, it will display ----
 * @param left the position of the gauge X
 * @param top the position of the gauge Y
 * @param hardLimit the max value of the gauge needle
 * @param scaling higher number = less movement && lower number = more movement
 * @param amberColor the color of the amber line (will defualt to "who tf knows")
 * @param redColor the color of the red line (will defult to "red CSS color")
 * @param limeColor the color of the lime needle (will defult to "lime CSS color")
 * @param yellowColor the color of the yellow line (will defult to "yellow CSS color")
 * @param fillerColor the color of the filler (will defult to "grey CSS color")
 * @param forceRedInYellowTime the time in ms that the needle will be forced to red when itt > yellow line value (e170 is 120000ms)
 * @returns JSX.Element
 */
export const IttGauge: FC<T_ittGaugeProps> = (props: T_ittGaugeProps): JSX.Element => {
  const [forceRed, setForceRed] = useState<boolean>(false);

  //we need to set a timeout when itt > yellow line value and clear the timeout if itt < yellow line value
  useEffect(() => {
    if (props.ittValue > props.yellowLineValue) {
      const timer = setTimeout(() => {
        setForceRed(true);
      }, props.forceRedInYellowTime);
      return () => clearTimeout(timer);
    } else {
      setForceRed(false);
    }
  }, [props.ittValue]);

  return (
    <div className="itt-gauge-container-absolute" style={{ left: `${props.left}px`, top: `${props.top}px` }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {props.invalid ? null : (
          <g transform={`rotate(-135 50 50)`}>
            <path
              id={'filler'}
              d={`m 50 50 L 50 15 A 35 35 0 ${limiter(props.hardLimit, props.ittValue) / props.scaling > 180 ? 1 : 0} 1 ${
                findCoordsOnCircle(50, 50, 35, limiter(props.hardLimit, props.ittValue) / props.scaling).x
              } ${findCoordsOnCircle(50, 50, 35, limiter(props.hardLimit, props.ittValue) / props.scaling).y} Z`}
              fill={
                getIttGaugeColor(
                  props.redColor,
                  props.yellowColor,
                  props.limeColor,
                  props.fillerColor,
                  props.ittValue,
                  props.redlineValue,
                  props.yellowLineValue,
                  forceRed,
                ).fillColor
              }
            />
          </g>
        )}
        <circle cx={50} cy={50} r={35} stroke={'white'} stroke-width={2} fill={'transparent'} />
        {props.invalid ? null : (
          <g transform={`rotate(-135 50 50)`}>
            <path
              stroke={props.redColor}
              strokeWidth={2}
              strokeLinecap={'round'}
              id={'redlineBug'}
              d={`m ${findCoordsOnCircle(50, 50, 35, props.redlineValue / props.scaling).x}  ${
                findCoordsOnCircle(50, 50, 35, props.redlineValue / props.scaling).y
              } L${findCoordsOnCircle(50, 50, 30, props.redlineValue / props.scaling).x}  ${
                findCoordsOnCircle(50, 50, 30, props.redlineValue / props.scaling).y
              }`}
            />
            <path
              stroke={props.yellowColor}
              strokeWidth={2}
              strokeLinecap={'round'}
              id={'yellowlineBug'}
              d={`m ${findCoordsOnCircle(50, 50, 35, props.yellowLineValue / props.scaling).x}  ${
                findCoordsOnCircle(50, 50, 35, props.yellowLineValue / props.scaling).y
              } L${findCoordsOnCircle(50, 50, 30, props.yellowLineValue / props.scaling).x}  ${
                findCoordsOnCircle(50, 50, 30, props.yellowLineValue / props.scaling).y
              }`}
            />

            <g transform={`rotate(${limiter(props.hardLimit, props.ittValue) / props.scaling} 50 50)`}>
              <path
                d={`M 48.5 50 L 48.5 30 L50 17.5L 51.5 30 L 51.5 50 `}
                fill={
                  getIttGaugeColor(
                    props.redColor,
                    props.yellowColor,
                    props.limeColor,
                    props.fillerColor,
                    props.ittValue,
                    props.redlineValue,
                    props.yellowLineValue,
                    forceRed,
                  ).needleColor
                }
                stroke={'black'}
                paintOrder={'stroke'}
                strokeWidth={1.5}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
              />
            </g>
          </g>
        )}
        <circle cx={50} cy={50} r={3} stroke={'white'} strokeWidth={1} fill={'black'} />
        {props.fire ? (
          <g>
            <rect
              x={30}
              y={32.5}
              width={40}
              height={25}
              fill={props.redColor}
              stroke={'black'}
              strokeWidth={2}
              strokeLinejoin={'round'}
            />
            <text x={50} y={50} textAnchor={'middle'} fill={'white'} fontSize={15}>
              FIRE
            </text>
          </g>
        ) : null}

        <rect x={25} y={75} width={50} height={20} fill={'black'} stroke={'white'} strokeWidth={2} strokeLinejoin={'round'} />
        <text x={50} y={90} textAnchor={'middle'} fill={`${props.invalid ? props.amberColor : props.limeColor}`} fontSize={10}>
          {props.invalid == false ? props.ittValue.toFixed(0) : '----'}
        </text>
      </svg>
    </div>
  );
};
IttGauge.defaultProps = {
  ittValue: 0,
  redlineValue: 0,
  yellowLineValue: 0,
  fire: false,
  invalid: false,
  left: 0,
  top: 0,
  hardLimit: 0,
  scaling: 0,
  amberColor: 'yellow',
  redColor: 'red',
  limeColor: 'lime',
  yellowColor: 'yellow',
  fillerColor: 'grey',
  forceRedInYellowTime: 120000,
};

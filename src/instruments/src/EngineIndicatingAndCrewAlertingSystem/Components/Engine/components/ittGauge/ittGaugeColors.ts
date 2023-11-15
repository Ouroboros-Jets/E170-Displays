type ittGaugeColorReturnType = {
  fillColor: string;
  needleColor: string;
};

export const getIttGaugeColor = (
  redColor: string,
  yellowColor: string,
  limeColor: string,
  sFillColor: string,
  itt: number,
  redline: number,
  yellowline: number,
  forceRed: boolean,
): ittGaugeColorReturnType => {
  let fillColor: string;
  let needleColor: string;
  if (itt >= redline) {
    fillColor = redColor;
    needleColor = '#fffeff';
  } else if (forceRed) {
    fillColor = redColor;
    needleColor = '#fffeff';
  } else if (itt >= yellowline && !forceRed) {
    fillColor = yellowColor;
    needleColor = yellowColor;
  } else {
    fillColor = sFillColor;
    needleColor = limeColor;
  }
  return { fillColor: fillColor, needleColor: needleColor };
};

export const limiter = (limit: number, value: number): number => {
  if (value > limit) {
    return limit;
  } else {
    return value;
  }
};

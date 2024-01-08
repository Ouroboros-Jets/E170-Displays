import { E_ThrustRatingType } from '../types/thrustRatingTypes';
export const getThrustRatingAnnunciatorString = (thrustRating: E_ThrustRatingType): string => {
  let annunciator: string = '';

  switch (thrustRating) {
    case E_ThrustRatingType.GA:
      annunciator = 'GA';
      break;
    case E_ThrustRatingType.GA_RSV:
      annunciator = 'GA RSV';
      break;
    case E_ThrustRatingType.TO_1_RSV:
      annunciator = 'T/O-1 RSV';
      break;
    case E_ThrustRatingType.TO_1:
      annunciator = 'T/O-1';
      break;
    case E_ThrustRatingType.FLEX_TO_1:
      annunciator = 'FLEX T/O-1';
      break;
    case E_ThrustRatingType.TO_2_RSV:
      annunciator = 'T/O-2 RSV';
      break;
    case E_ThrustRatingType.TO_2:
      annunciator = 'T/O-2';
      break;
    case E_ThrustRatingType.FLEX_TO_2:
      annunciator = 'FLEX T/O-2';
      break;
    case E_ThrustRatingType.TO_3_RSV:
      annunciator = 'T/O-3 RSV';
      break;
    case E_ThrustRatingType.TO_3:
      annunciator = 'T/O-3';
      break;
    case E_ThrustRatingType.FLEX_TO_3:
      annunciator = 'FLEX T/O-3';
      break;
    case E_ThrustRatingType.CON:
      annunciator = 'CON';
      break;
    case E_ThrustRatingType.CLB_1:
      annunciator = 'CLB-1';
      break;
    case E_ThrustRatingType.CLB_2:
      annunciator = 'CLB-2';
      break;
    case E_ThrustRatingType.CRZ:
      annunciator = 'CRZ';
      break;
  }
  return annunciator;
};

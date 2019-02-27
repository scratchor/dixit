import { REPORT_ASSOCIATION } from './types';

export default value => {
  return {
    type: REPORT_ASSOCIATION,
    meta: { remote: true },
    association: value
  };
};

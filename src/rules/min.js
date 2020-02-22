import {getLength} from "../helpers";

export const min = (value, [num]) => {
  return getLength(value) < parseFloat(num);
};

export default [
  min,
];

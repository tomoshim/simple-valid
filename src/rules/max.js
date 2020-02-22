import {getLength} from "../helpers";

export const max = (value, [num]) => {
  return getLength(value) > parseFloat(num);
};

export default [
  max,
];

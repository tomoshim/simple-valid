import {getLength} from "../helpers";

export default function (value, [num]) {
  return getLength(value) > parseFloat(num);
}
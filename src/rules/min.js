import {getLength} from "../helpers";

export default function (value, params) {
  let num = params[0];
  let length = getLength(value);
  num = parseFloat(num);
  return length >= num ? false : true;
}
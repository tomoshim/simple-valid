export default function (value, params) {
  let re = new RegExp(params[0]);
  let result = value.match(re);
  return result === null || !result[0] ? true : false;
}
export default function (value, params) {
  let result = false;
  if (value === '' || value === null || value === undefined) {
    result = true;
  }
  return result;
}
export default (value, params) => {
  let result = false;
  for (let i = 0; i < params.length; i++) {
    if (value === params[i]) result = true;
  }
  return result;
}
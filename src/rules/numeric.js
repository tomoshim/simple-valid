export default (value, params) => {
  return isNaN(parseInt(value)) ? true : false;
}
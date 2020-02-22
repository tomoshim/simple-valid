export const not_in = (value, params) => {
  return params.reduce((result, each_param) => {
    if (value === each_param) return true;
    return result;
  }, false);
};

export default [
  not_in,
];

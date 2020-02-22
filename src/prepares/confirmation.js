export default (values, key, params) => {
  const confirmation_key = `${key}_confirmation`;
  return values[confirmation_key] === undefined ? [] : [values[confirmation_key]];
};

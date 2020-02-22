export const required = (value, params) => {
  return value === ''
      || value === null
      || value === undefined;
};

export default [
  required,
];

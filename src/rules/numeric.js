export const numeric = (value, params) => {
  if (!['string', 'number'].includes(typeof value)) return true;
  if (value === '') return true;

  return isNaN(value);
};

export default [
  numeric,
];

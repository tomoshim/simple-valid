export const regex = (value, [pattern]) => {
  const regExp = new RegExp(pattern);
  const result = value.match(regExp);

  return result === null || !result[0];
};

export default [
  regex,
];

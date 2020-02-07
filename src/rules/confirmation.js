import prepares from '../prepares/confirmation';

const rule = (value, [original_password]) => {
  return value !== original_password;
};

export default [
  rule,
  prepares
]
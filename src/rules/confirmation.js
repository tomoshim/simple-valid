import prepares from '../prepares/confirmation';

const rule = (value, params) => {
  return value !== params[0] ? true : false;
};

export default [
  rule,
  prepares
]
/**
 * get length of array|string|number.
 * @param obj
 * @returns {number|boolean}
 */
export const getLength = (obj) => {
  if (obj === null || obj === undefined) return false;
  if (typeof obj === 'number') return obj;
  if (typeof obj === 'string') return obj.length;
  if (isArray(obj)) return obj.length;

  if (obj.length !== undefined) return obj.length;
  return false;
};

const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

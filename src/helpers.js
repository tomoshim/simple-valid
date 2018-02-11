/**
 * get length of array|string|number.
 * @param obj
 * @returns {boolean}
 */
export const getLength = (obj) => {
  let length = false;
  if (isNaN(obj) && obj.length !== undefined) {
    // check array length.
    if (obj.length !== undefined || typeof obj === 'string') {
      length = obj.length;
    }
  } else {
    length = obj;
  }
  return length;
};


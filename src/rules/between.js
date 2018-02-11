import min from './min';
import max from './max';

export default function (value, params) {
  let min_result = min(value, [params[0]]);
  let max_result = max(value, [params[1]]);
  return !min_result && !max_result ? false : true;
}

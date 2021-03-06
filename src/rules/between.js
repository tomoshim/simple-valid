import min from './min';
import max from './max';

export default function (value, [min_num, max_num]) {
  const min_failed = min(value, [min_num]);
  const max_failed = max(value, [max_num]);

  return min_failed || max_failed;
}

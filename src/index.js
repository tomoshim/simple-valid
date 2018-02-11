import rules from './rules';
import messages from './messages';
import Validate from './SimpleValid';

export default new Validate(rules, messages);

export { default as Validate } from './SimpleValid';

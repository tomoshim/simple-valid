import rules from './rules';
import messages from './messages';
import Validate from './SimpleValid';
const _Validate =  new Validate(rules, messages);

window.SimpleValid = Validate;
window.simpleValid = _Validate;

import Errors from 'simple-error-object';
/**
 * Check and Return Error Object.
 * Error Object is Using simple-error-object.
 * https://github.com/WireframesJPN/simple-error-object
 * {
 *  user_id: 'required|email', // add validator with pipe,
 *  password: [ 'required', 'not_in:test,aaaa', 'regex:^[0-9a-zA-Z]+$' ] // or array.
 * }
 */
export default class SimpleValid {

  /**
   * @param {Object<string, function|function[]>} rules
   * @param {Object<string, string|function>} messages
   */
  constructor (rules = {}, messages) {
    this.rules = {};
    this.prepares = {};
    this.messages = {};

    Object.entries(rules).forEach(([rule_name, rule]) => {
      this.addRule(rule_name, rule, messages[rule_name])
    });
  }

  /**
   *
   * @param {string} rule_name
   * @param {function|[function, function]} rule
   * @param {string|function} message
   */
  addRule (rule_name, rule, message) {
    const [base_rule, prepare] = typeof rule === 'function' ? [rule] : rule;
    const safe_message = message === undefined ? `${rule_name} was undefined` : message;

    this.rules[rule_name] = base_rule;

    if (prepare) this.prepares[rule_name] = prepare;
    if (safe_message) this.messages[rule_name] = safe_message;
  }

  /**
   * execute validation.
   *
   * @param {Object} values
   * @param {Object} rules
   * @param {Object<string, string|function>} messages
   *
   * @returns {Errors}
   */
  execute (values, rules, messages={}) {
    const rule_params = this.createRuleParams(rules, values);

    const errors = new Errors();

    try {
      Object.entries(rule_params).forEach(([rule_key, rule_config]) => {
        const target_value = values[rule_key];
        if (target_value === undefined) throw 'Missing Validation Target.';

        const error = this.validate(rule_config, target_value);

        if (error) {
          const message = this.getMessage(error.name, rule_key, messages);

          errors.add(rule_key, (typeof message === 'function' ? message(error.value, error.rule.params) : message))
        }
      });

      return errors;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Create Rules Config Like this..
   *
   * {
   *  'email': [
   *    { name: 'required', params: [] },
   *    { name: 'email', params: [] },
   *  ]
   * }
   *
   * @param {Object<string, string|[]>} rules
   * @param {Object} values
   *
   * @return {Object<string, Array.<Object.<{name: string, params: []}>>>}
   */
  createRuleParams (rules, values) {
    return Object.entries(rules).reduce((reduced, [param_name, rules]) => {
      const splitted_rules = typeof rules === 'string' ? rules.split('|') : rules;

      reduced[param_name] = splitted_rules.map((each_rules) => this.createRuleParam(param_name, each_rules, values));

      return reduced;
    }, {});
  }

  /**
   * Create Validation Rule Config Like this..
   *
   * {
   *  name: '',
   *  params: []
   * }
   *
   * @param {string} param_name
   * @param {string|[]} ruleString
   * @param {Object} values
   *
   * @return {Object.<{name: string, params: []}>}
   */
  createRuleParam (param_name, ruleString, values) {
    const rule = ruleString.split(':');
    const [rule_name, ...rest_params] = rule;

    const splitted_params = rest_params.length === 0 ?
        rest_params :
        rest_params.join(':').split(',');

    /**
     * Preparing Rule Object.
     * you can modify rule object if you set up the preparing object.
     */
    const params = this.prepares[rule_name] ?
        this.prepares[rule_name](values, param_name, splitted_params) :
        splitted_params;

    return {
      name: rule_name,
      params
    }
  }

  /**
   * check validation rules and add error if exist.
   * error
   * @param {Array.<string|[]>} rule_param
   * @param {*} value
   * @return {null|string|{name: string, value: string, rule: {string|[]}}}
   */
  validate (rule_param, value) {
    for (let i = 0; i < rule_param.length; i++) {
      const { name, params } = rule_param[i];
      if (!this.rules[name]) return 'norule';

      const invalid = this.rules[name](value, params);
      if (invalid) return { name, value, rule: rule_param[i] };
    }

    return null;
  }

  /**
   *
   * @param name
   * @param target
   * @param message
   * @return {*}
   */
  getMessage (name, target, message) {
    if (!message) return this.messages[name];
    if (message[target] === undefined) return this.messages[name];
    if (message[target][name] === undefined) return this.messages[name];

    return message[target][name];
  }

}

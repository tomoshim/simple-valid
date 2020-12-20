## simple-valid

Touch and Feel like Laravel Validation.

## How to use

```js
import Validator from 'simple-valid';

/**
 * Prepare your target object that should be validated.
 */
const target = {
    first_name: 'Bucky',
    last_name: 'Barnes',
    homepage: 'ftp://bucky-barnes.com'
};

/**
 * Define the rules for each properties.
 * You can write the rules just like you write Laravel's.
 */
const rules = {
    first_name: 'required|numeric',
    last_name: ['required', 'min:6']
}

/**
 * You can optionally define your original rule.
 */
Validator.addRule(
    'my_url',
    (value, params) => {
        const [result] = value.match(new RegExp("^https?:\/\/.+$")) || []

        return !result
    },
    "it's not like my_url"
)

/**
 * Executing the validation will give you its result as an instance of SimpleErrorObject.
 *
 * @see https://github.com/WireframesJPN/simple-error-object
 */
const result = Validator.execute(
    target,
    { ...rules, homepage: 'required|my_url' }
);

/**
 * By calling `has` method, You will know if the result has some errors.
 */
const hasError = result.has();

/**
 * If you would like to get the all errors, `all` method is just fine.
 */
const errors = result.all();

console.log(errors); // { first_name: ['must be numeric'], homepage: ['it's not like my_url'] }
```

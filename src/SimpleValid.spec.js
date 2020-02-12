import chai from 'chai';
import validate from './index';

describe('Validate Error Check', () => {
  const simple_validator = (value, rule) => validate.execute({ 'test': value }, { 'test': rule });

  describe('Rule: required', () => {
    it('OK', () => {
      chai.assert.equal(
        simple_validator('OK', 'required').has('test'),
        false
      )
    });

    it('NG', () => {
      chai.assert.equal(
        simple_validator('', 'required').has('test'),
        true
      );
    });
  });

  describe('Rule: email', () => {
    it('OK', () => {
      chai.assert.equal(
        simple_validator('test@wire.com', 'email').has('test'),
        false
      );
    });

    it('NG', () => {
      chai.assert.equal(
        simple_validator('fefeafea.vee', 'email').has('test'),
        true
      );
    });
  });

  describe('Rule: not_in', () => {
    it('OK', () => {
      chai.assert.equal(
        simple_validator('not_in is not error', 'not_in:test').has('test'),
        false
      );
    });

    it('NG', () => {
      chai.assert.equal(
        simple_validator('test', 'not_in:test,test2').has('test'),
        true
      );
    });
  });

  describe('Rule: min', () => {
    it('OK', () => {
      chai.assert.equal(
        simple_validator('test', 'min:3').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('test', 'min:4').has('test'),
        false
      );
    });

    it('NG', () => {
      chai.assert.equal(
        simple_validator('test', 'min:5').has('test'),
        true
      );
    });
  });

  describe('Rule: max', () => {
    it('OK', () => {
      chai.assert.equal(
        simple_validator('test', 'max:5').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('test', 'max:4').has('test'),
        false
      );
    });

    it('NG', () => {
      chai.assert.equal(
        simple_validator('test', 'max:3').has('test'),
        true
      );
    });
  });

  describe('Rule: between', () => {
    it('OK', () => {
      chai.assert.equal(
        simple_validator('testing', 'between:6,8').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('testing', 'between:7,8').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('testing', 'between:6,7').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('testing', 'between:7,7').has('test'),
        false
      );
    });

    it('NG', () => {
      chai.assert.equal(
        simple_validator(null, 'between:6,6').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator('testing', 'between:6,6').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator('testing', 'between:8,8').has('test'),
        true
      );
    });
  });

  describe('Rule: numeric', () => {
    it('OK', () => {
      chai.assert.equal(
        simple_validator(0, 'numeric').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('0', 'numeric').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator(1, 'numeric').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('1', 'numeric').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator(2, 'numeric').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('2', 'numeric').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator(3.3, 'numeric').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('3.3', 'numeric').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator(-4, 'numeric').has('test'),
        false
      );

      chai.assert.equal(
        simple_validator('-4', 'numeric').has('test'),
        false
      );
    });

    it('NG', () => {
      chai.assert.equal(
        simple_validator(null, 'numeric').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator(NaN, 'numeric').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator('', 'numeric').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator('test', 'numeric').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator('1test', 'numeric').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator('test1', 'numeric').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator([], 'numeric').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator([1], 'numeric').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator([1, 2], 'numeric').has('test'),
        true
      );

      chai.assert.equal(
        simple_validator({}, 'numeric').has('test'),
        true
      );
    });
  });

  describe('Rule: regex', () => {
    it('OK', () => {
      chai.assert.equal(
        simple_validator('http://test.com', 'regex:^http://').has('test'),
        false
      );
    });

    it('NG', () => {
      chai.assert.equal(
        simple_validator('test.com', 'regex:^http://').has('test'),
        true
      );
    });
  });

  describe('Rule: confirmation', () => {
    it('OK', () => {
      chai.assert.equal(
        validate.execute(
          {'test': 'test', 'test_confirmation': 'test'},
          {'test': 'confirmation'}
        ).has('test'),
        false
      );
    });

    it('NG', () => {
      chai.assert.equal(
        validate.execute(
          {'test': 'test.com', 'test_confirmation': 'test'},
          {'test': 'confirmation'}
        ).has('test'),
        true
      )
    });
  });

  describe('Multiple validations', () => {
    describe('required|email', () => {
      it('OK', () => {
        chai.assert.equal(
          validate.execute(
            {'test': 'test@test.com'},
            {'test': 'required|email'}
          ).has('test'),
          false
        );
      });

      it('NG', () => {
        chai.assert.equal(
          validate.execute(
            {'test': 'test.com'},
            {'test': 'required|email'}
          ).has('test'),
          true
        );

        chai.assert.equal(
          validate.execute(
            {'test': ''},
            {'test': 'required|email'}
          ).has('test'),
          true
        );
      });
    });
  });
});

describe('Validation Message Check', () => {
  it('custom error message: text', () => {
    chai.assert.equal(
      validate.execute(
        { test: '' },
        { test: 'required'},
        {
          test: {
            required: 'message has been customized'
          }
        }
      ).get('test'),
      'message has been customized'
    );
  });

  it('customize error message: function', () => {
    chai.assert.equal(
      validate.execute(
        { test: 'testtesttest' },
        { test: 'between:1,5' },
        {
          test: {
            between: function (value, params) {
              return `${params[0]},${params[1]}`;
            }
          }
        }
      ).get('test'),
      '1,5'
    );
  });
});

describe('Validation New Rule Check', () => {
  it('add New Rule', () => {
    validate.addRule(
      'exact',
      (value, params) => !(value === 'exact'),
      (value, params) => 'only "exact" is accept.'
    );

    chai.assert.equal(
      validate.execute(
        { test: 'exact' },
        { test: 'required|exact' }
      ).get('test'),
      false
    );
  });
});

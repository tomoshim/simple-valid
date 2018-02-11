import chai from 'chai';
import validate from './index';

describe('Validate Error Check', () => {

  it('required: OK', () => {
    let error = validate.execute({
      'test': 'OK'
    }, {
      'test': 'required'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('required: NG', () => {
    chai.assert.equal(validate.execute({
      'test': ''
    }, {
      'test': 'required'
    }).has('test'), true)
  });

  it('email: OK', () => {
    let error = validate.execute({
      'test': 'test@wire.com'
    }, {
      'test': 'email'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('emai: NG', () => {
    chai.assert.equal(validate.execute({
      'test': 'fefeafea.vee'
    }, {
      'test': 'email'
    }).has('test'), true)
  });

  it('not_in: OK', () => {
    let error = validate.execute({
      'test': 'not_in is not error'
    }, {
      'test': 'not_in:test'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('not_in: NG', () => {
    chai.assert.equal(validate.execute({
      'test': 'test'
    }, {
      'test': 'not_in:test,test2'
    }).has('test'), true)
  });

  it('min: OK', () => {
    let error = validate.execute({
      'test': 'test'
    }, {
      'test': 'min:3'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('min: NG', () => {
    chai.assert.equal(validate.execute({
      'test': 'test'
    }, {
      'test': 'min:5'
    }).has('test'), true)
  });

  it('max: OK', () => {
    let error = validate.execute({
      'test': 'test'
    }, {
      'test': 'max:10'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('max: NG', () => {
    chai.assert.equal(validate.execute({
      'test': 'testtesttesttest'
    }, {
      'test': 'max:10'
    }).has('test'), true)
  });

  it('between: OK', () => {
    let error = validate.execute({
      'test': 'testtest'
    }, {
      'test': 'between:3,10'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('between: NG', () => {
    chai.assert.equal(validate.execute({
      'test': 'testtesttesttest'
    }, {
      'test': 'between:3,10'
    }).has('test'), true)
  });

  it('numeric: OK', () => {
    let error = validate.execute({
      'test': '1100'
    }, {
      'test': 'numeric'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('numeric: NG', () => {
    chai.assert.equal(validate.execute({
      'test': 'testtesttesttest'
    }, {
      'test': 'numeric'
    }).has('test'), true)
  });

  it('regex: OK', () => {
    let error = validate.execute({
      'test': 'http://test.com'
    }, {
      'test': 'regex:^http://'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('regex: NG', () => {
    chai.assert.equal(validate.execute({
      'test': 'test.com'
    }, {
      'test': 'regex:^http://'
    }).has('test'), true)
  });

  it('confirmation: OK', () => {
    let error = validate.execute({
      'test': 'test',
      'test_confirmation': 'test'
    }, {
      'test': 'confirmation'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('confirmation: NG', () => {
    chai.assert.equal(validate.execute({
      'test': 'test.com',
      'test_confirmation': 'test'
    }, {
      'test': 'confirmation'
    }).has('test'), true)
  });

  it('multiple validation. - required|email: OK', () => {
    let error = validate.execute({
      'test': 'test@test.com',
    }, {
      'test': 'required|email'
    });
    chai.assert.equal(error.has('test'), false)
  });

  it('multiple validation 1. - required|email: NG', () => {
    chai.assert.equal(validate.execute({
      'test': 'test.com',
    }, {
      'test': 'required|email'
    }).has('test'), true)
  });

  it('multiple validation 2. - required|email: NG', () => {
    chai.assert.equal(validate.execute({
      'test': '',
    }, {
      'test': 'required|email'
    }).has('test'), true)
  });

});


describe('Validation Message Check', () => {

  it('custom error message: text', () => {
    chai.assert.equal(validate.execute({
      test: ''
    }, {
      test: 'required'
    }, {
      test: {
        required: 'message has been customized'
      }
    }).get('test'), 'message has been customized')
  });

  it('customize error message: function', () => {
    chai.assert.equal(validate.execute({
      test: 'testtesttest'
    }, {
      test: 'between:1,5'
    }, {
      test: {
        between: function (value, params) {
          return `${params[0]},${params[1]}`;
        }
      }
    }).get('test'), '1,5');
  });

});

describe('Validation New Rule Check', () => {

  it('add New Rule', () => {
    validate.addRule('exact', (value, params) => {
      return value === 'exact' ? false : true;
    }, (value, params) => {
      return 'only "exact" is accept.';
    });

    chai.assert.equal(validate.execute({
      test: 'exact'
    }, {
      test: 'required|exact'
    }).get('test'), false)
  });

});

import Errors from '../Errors';

export default class Validator extends Errors {
  constructor(data) {
    super();
    this.data = data;
  }

  //
  // Required
  // ----------------------------------------------
  require(key) {
    const value = this.data[key];
    if (typeof value !== 'boolean' && !Boolean(value)) {
      this.addError({
        key, 
        code: 'REQUIRED',
        message: 'This field is required',
      });
      return false;
    }
    return true;
  }

  //
  // Type
  // ----------------------------------------------
  checkType (key, type = 'string') {
    const value = this.data[key];
    if (!value) return true;
    if (typeof value !== type) {
      this.addError({
        key, 
        code: 'WRONG_TYPE',
        message: `This field should be a ${type}`,
      });
      return false;
    }
    return true;
  }

  //
  // Max length for string
  // ----------------------------------------------
  maxLength(key, max = 144) {
    const value = this.data[key];
    if (!value) return true;
    const typeOk = this.checkType(key, 'string');
    if (!typeOk) return false;
    if (value.length > max) {
      this.addError({
        key,
        code: 'TOO_LONG',
        message: `The maximum length is ${max} characters`,
      });
      return false;
    }
    return true;
  }

}


export default class Errors {
  constructor () {
    this.errors = [];
  }
  addError(error = {code, message, key}) {
    this.errors.push(error);
  }
  clearErrors() {
    this.errors = [];
  }
  getErrorByCode(code) {
    return this.errors.find(error => error.code === code);
  }
  getErrorByKey(key) {
    return this.errors.find(error => error.key === key);
  }
  get hasErrors() {
    return this.errors.length > 0;
  }
}


export default class Response {
  constructor (data) {
    this.ok = true;
    this.data = data;
    this.errors = [];
  }
  addError(error = {code, message, key}) {
    this.ok = false;
    this.errors.push(error);
  }
  getErrorByCode(code) {
    return this.errors.find(error => error.code === code);
  }
  getErrorByKey(key) {
    return this.errors.find(error => error.key === key);
  }
}
import { popup, loading } from '../stores/ui'; 
import ErrorPopup from '../components/popups/ErrorPopup.svelte'; 

export default class Errors {
  constructor () {
    this.errors = [];
  }
  popError(message) {
    loading.set(false);
    popup.set({component: ErrorPopup, props: {message}});
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
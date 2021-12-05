
import { get } from 'svelte/store';

const messages = {
  DEFAULT: `An error occured`,
};


export function getErrorMessage(code) {
  return messages[code.toUpperCase()] || messages.DEFAULT;
}


export function getError(name, store) {
  const $store = get(store);
  if (!$store.errors) return;
  const error = $store.errors.find(error => error.key === name);
  if (!error) return;
  return error.message || getErrorMessage(error.code);
}

export function removeError(name, store) {
  const $store = get(store);
  if (!$store.errors) return;
  const errorIndex = $store.errors.findIndex(error => error.key === name);
  if (errorIndex > -1) {
    store.update(data => {
      data.errors.splice(errorIndex, 1);
      return data;
    })
  }
}
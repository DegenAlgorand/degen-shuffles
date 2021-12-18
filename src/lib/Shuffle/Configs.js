import { omit, pickBy } from 'lodash';
import Validator from './Validator';
const defaultConfigs = {
  assetId: undefined,
  assetName: '',
  creatorAddress: undefined,
  url: undefined,
  twitter: undefined,
  description: undefined,
  requireOptin: true,
  decreasePrevWinners: true,
  useLogScale: false,
  creatorCanWin: false,
}


export default class Configs {
  constructor () { 
    this.configs = defaultConfigs;
  }
 
  //
  // Reset configs
  // ----------------------------------------------
  resetConfigs () {
    this.clearErrors();
    this.configs = defaultConfigs;
  }

  //
  // Set configs
  // ----------------------------------------------
  setConfigs (newConfigs) {
    this.clearErrors();
    return this.validateConfigs(newConfigs);
  }

  //
  // Get config object
  // remove asset params and empty values
  // ----------------------------------------------
  getConfigsObj() {
    const withoutAssetParams = omit(this.configs, [
      'assetId',
      'assetName',
      'creatorAddress',
    ]);
    return withoutAssetParams;
  }



  //
  // Validate configs
  // ----------------------------------------------
  validateConfigs (newConfigs) {
    const validKeys = Object.keys(defaultConfigs);
    this.clearErrors();
    let configs = {
      ...this.configs,
      ...newConfigs,
    }
    configs = pickBy(configs, (value, key) => validKeys.includes(key));

    const validator = new Validator(configs);
    
    validator.require('assetName');
    validator.maxLength('assetName', 32);

    validator.maxLength('url', 96);
    validator.maxLength('twitter', 16);
    validator.maxLength('description', 300);

    this.errors = validator.errors;

    if (!this.hasErrors) {
      this.configs = configs;
      this.dispatchUpdate();
    }
    return !this.hasErrors;
  }

}
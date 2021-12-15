import { omit, omitBy, isNil } from 'lodash';
const defaultConfigs = {
  assetId: undefined,
  assetName: '',
  creatorAddress: undefined,
  description: undefined,
  decreasePreviousWinners: true,
  requireOptin: false,
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
    const withoutEmpty = omitBy(this.configs, isNil);
    const withoutAssetParams = omit(withoutEmpty, [
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
    this.clearErrors();
    const configs = {
      ...this.configs,
      ...newConfigs,
    }

    // ASA name
    if (!configs.assetName || typeof configs.assetName !== 'string') {
      this.addError({
        code: 'REQUIRED',
        key: 'assetName', 
        message: 'ASA name is required',
      });
    }
    if (configs.assetName.length > 32) {
      this.addError({
        code: 'TOO_LONG',
        key: 'assetName', 
        message: 'The maximum length for an ASA name is 32 characters',
      });
    }

    // Description
    if (configs.description) {
      if(configs.description.length > 300) {
        this.addError({
          code: 'TOO_LONG',
          key: 'description', 
          message: 'The maximum length for description is 300 characters',
        });
      }
    } 

    if (!this.hasErrors) {
      this.configs = configs;
      this.dispatchUpdate();
    }
    return !this.hasErrors;
  }

}
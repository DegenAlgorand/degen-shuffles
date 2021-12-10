import { omit, omitBy, isNil } from 'lodash';
import algoClient from '../algoClient';

export default class Configs {
  constructor () {
    this.configs = {
      assetId: undefined,
      assetName: '$DEGEN Shuffle',
      creatorAddress: undefined,
      displayName: 'My Shuffle',
      description: undefined,
    };
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

    // Display name
    if (configs.displayName && configs.displayName.length > 64) {
      this.addError({
        code: 'TOO_LONG',
        key: 'displayName', 
        message: 'The maximum length for  dispaly name is 64 characters',
      });
    }

    if (!this.hasErrors) {
      this.configs = configs;
    }
    return !this.hasErrors;
  }

}
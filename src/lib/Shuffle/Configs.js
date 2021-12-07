
export default class Configs {
  constructor (id) {
    this.configs = {
      assetName: '$DEGEN Shuffle',
      displayName: 'My Shuffle',
    };
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
    // ASA Name
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

    if (!this.hasErrors) {
      this.configs = configs;
    }
    return this.hasErrors;
  }
}
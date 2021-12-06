
export default class Configs {
  constructor (id) {
    this.configs = {
      name: 'Untitled',
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
    // Name (required)
    if (!configs.name || typeof configs.name !== 'string') {
      this.addError({
        code: 'REQUIRED',
        key: 'name', 
        message: 'Shuffle name is required',
      });
    }
    if (!this.hasErrors) {
      this.configs = configs;
    }
    return this.hasErrors;
  }
}
import Response from './Response';

export default class Shuffle {

  constructor () {
    this.configs = {
      name: 'Untitled',
    };
  }


  //
  // Validate configs
  // ----------------------------------------------
  static validateConfigs (newConfigs) {
    const configs = {
      ...this.configs,
      ...newConfigs,
    }
    const response = new Response(configs);

    // Name (required)
    if (!configs.name || typeof configs.name !== 'string') {
      response.addError({
        code: 'REQUIRED',
        key: 'name', 
        message: 'Shuffle name is required',
      });
    }

    // Config total length
    return response;
  }


}
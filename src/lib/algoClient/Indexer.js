import vars from '../../vars'; 

export default class Indexer {
  //
  // Main fetching method
  // ----------------------------------------------
  async indexerApi(endpoint, params = {}) {
    try {
      let loop = false;
      if (params.loop) {
        loop = true;
        delete params.loop;
      }
      let queryString = new URLSearchParams(params).toString();
      let response = await fetch(`${vars.INDEXER_URL}${endpoint}?${queryString}`);
      let data = await response.json();
      if (loop) {
        while (data['next-token']) {
          queryString = new URLSearchParams({ ...params, next: data['next-token']}).toString();
          response = await fetch(`${vars.INDEXER_URL}${endpoint}?${queryString}`);
          let temp = await response.json();
          // remove next-token
          delete data['next-token'];
          // loop paged data
          Object.entries(temp).forEach(([key, value]) => {
            // merge arrays
            if (value.length !== undefined && data[key]) {
              data[key] = [ ...data[key], ...value ];
            }
            // overwrite other types
            else {
              data[key] = value;
            } 
          });
        }
      }
      return data;
    }
    catch (error) {
      console.dir(error);
      this.popError(error.message);
    }
  }


  //
  // Methods: https://algorand.github.io/js-algorand-sdk/classes/indexer.html 
  // Params: https://algoexplorer.io/api-dev/indexer-v2

  //
  // Lookup
  // ----------------------------------------------
  // accounts
  async lookupAccountByID(accountId, params = {}) {
    return await this.indexerApi(`/v2/accounts/${accountId}`, params);
  }
  async lookupAccountTransactions(accountId, params = {}) {
    return await this.indexerApi(`/v2/accounts/${accountId}/transactions`, params);
  }
  // app
  async lookupApplications(appId, params = {}) {
    return await this.indexerApi(`/v2/applications/${appId}`, params);
  }
  // asset
  async lookupAssetByID(assetId, params = {}) {
    return await this.indexerApi(`/v2/assets/${assetId}`, params);
  }
  async lookupAssetBalances(assetId, params = {}) {
    return await this.indexerApi(`/v2/assets/${assetId}/balances`, params);
  }
  async lookupAssetTransactions(assetId, params = {}) {
    return await this.indexerApi(`/v2/assets/${assetId}/transactions`, params);
  }
  // block
  async lookupBlock(round, params = {}) {
    return await this.indexerApi(`/v2/blocks/${round}`, params);
  }
  // transaction
  async lookupTransactionByID(id, params = {}) {
    return await this.indexerApi(`/v2/transactions/${id}`, params);
  }

  //
  // Search
  // ----------------------------------------------
  async searchAccounts(params = {}) {
    return await this.indexerApi(`/v2/accounts`, params);
  }
  async searchForApplications(params = {}) {
    return await this.indexerApi(`/v2/applications`, params);
  }
  async searchForAssets(params = {}) {
    return await this.indexerApi(`/v2/assets`, params);
  }
  async searchForTransactions(params = {}) {
    return await this.indexerApi(`/v2/transactions`, params);
  }
}

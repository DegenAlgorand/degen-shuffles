import algoClient from '../algoClient';


export default class Read {
  //
  // Get Shuffle ASA + Configs
  // ----------------------------------------------
  async read (asaId) {
    if (!asaId) return;
    this.resetConfigs();
    let configsOk = true;
    
    // get asset
    const assetResponse = await algoClient.lookupAssetByID(asaId);
    if (!assetResponse || !assetResponse.asset) return false;
    // check if asset is a shuffle
    const asset = assetResponse.asset;
    const assetIsShuffle = asset.params['unit-name'] === 'DGNSHUFF';
    if(!assetIsShuffle) return false;
    // set basic data
    configsOk = this.setConfigs({
      assetId: asset.index,
      assetName: asset.params.name,
      creatorAddress: asset.params.creator,
    });
    if (!configsOk) return false;
    // get asset config transactions
    const configTxns = await algoClient.lookupAssetTransactions(this.configs.assetId, {
      'address': this.configs.creatorAddress,
      'address-role': 'sender',
      'tx-type': 'acfg',
    });
    const hasTransactions = configTxns && configTxns.transactions && configTxns.transactions.length;
    if (!hasTransactions) return false;
    // find last config transaction
    const transactions = configTxns.transactions.sort((a, b) => b["round-time"] - a["round-time"]);
    const lastTransaction = transactions[0];
    // decode note
    const assetConfigs = algoClient.decodeNote(lastTransaction.note)
    configsOk = this.setConfigs(assetConfigs);
    if (!configsOk) return false;
    // get asset optins
    const assetBalances = await algoClient.lookupAssetBalances(this.configs.assetId);
    this.optIns = assetBalances.balances.map(balance => balance.address);
    // get winners history
    const winnersHistory = await this.getWinnersHistory();
    if (!winnersHistory) console.log('Could not retreive winners history');
    return true;
  }
}

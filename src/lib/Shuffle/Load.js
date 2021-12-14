import { get } from 'svelte/store';
import algoClient from '../algoClient';
import { wallet } from '../../stores/wallet';
import { omit } from 'lodash';


export default class Fetch {
  //
  // Load Shuffle ASA + Configs
  // ----------------------------------------------
  async load (asaId) {
    if (!asaId) return;
    this.resetConfigs();
    let configsOk = true;
    const assetResponse = await algoClient.lookupAssetByID(asaId);
    if (!assetResponse || !assetResponse.asset) return false;
    
    const asset = assetResponse.asset;
    const assetIsShuffle = asset.params['unit-name'] === 'DGNSHUFF';
    if(!assetIsShuffle) return false;
    
    configsOk = this.setConfigs({
      assetId: asset.index,
      assetName: asset.params.name,
      creatorAddress: asset.params.creator,
    });
    if (!configsOk) return false;

    const configTxns = await algoClient.lookupAssetTransactions(this.configs.assetId, {
      'address': this.configs.creatorAddress,
      'address-role': 'sender',
      'tx-type': 'acfg',
    });

    const hasTransactions = configTxns && configTxns.transactions && configTxns.transactions.length;
    if (!hasTransactions) return false;
    
    const transactions = configTxns.transactions.sort((a, b) => b["round-time"] - a["round-time"]);
    const assetConfigs = algoClient.decodeNote(transactions[0].note)
    configsOk = this.setConfigs(assetConfigs);
    if (!configsOk) return false;

    return true;
  }
}

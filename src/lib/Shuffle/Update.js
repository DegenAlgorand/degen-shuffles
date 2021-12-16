import { get } from 'svelte/store';
import algoClient from '../algoClient';
import { wallet } from '../../stores/wallet';


export default class Update {
  //
  // Create shuffle ASA
  // ----------------------------------------------
  async update () {
    if (this.hasErrors) return;
    const $wallet = get(wallet);
    if (!$wallet.currentAddress) return;

    const configs = this.getConfigsObj();
    const txn = await algoClient.txn({
      assetIndex: this.configs.assetId,
      fee: 1000,
      flatFee: true,
      type: 'acfg',
      from: $wallet.currentAddress,
      assetReserve: $wallet.currentAddress,
      assetManager: $wallet.currentAddress,
      note: algoClient.encodeNote(configs)
    });

    this.setConfigs(configs);
    return txn;
  }
}
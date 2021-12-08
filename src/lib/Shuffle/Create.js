import { get } from 'svelte/store';
import algoClient from '../algoClient';
import { wallet } from '../../stores/wallet';

export default class Create {
  //
  // Create shuffle ASA
  // ----------------------------------------------
  async create () {
    if (this.hasErrors) return;
    const $wallet = get(wallet);
    if (!$wallet.currentAddress) return;

    console.log(this.configs);

    const response = await algoClient.txn({
      fee: 1000,
      flatFee: true,
      type: 'acfg',
      from: $wallet.currentAddress,
      assetName: this.configs.assetName,
      assetUnitName: 'DGNSHUFF',
      assetDecimals: 0,
      assetTotal: 1,
      assetURL: 'degenshuffles.xyz',
      assetManager: $wallet.currentAddress,
      assetReserve: $wallet.currentAddress,
      assetDefaultFrozen: false
    });
   
    return response;
  }
}
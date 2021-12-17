import { get } from 'svelte/store';
import algoClient from '../algoClient';
import { wallet } from '../../stores/wallet';
import vars from '../../vars';



export default class Create {
  //
  // Create shuffle ASA
  // ----------------------------------------------
  async create () {
    if (this.hasErrors) return;
    const $wallet = get(wallet);
    if (!$wallet.currentAddress) return;

    const configs = this.getConfigsObj();
    const txn = await algoClient.txn({
      fee: 1000,
      flatFee: true,
      type: 'acfg',
      from: $wallet.currentAddress,
      assetName: this.configs.assetName,
      assetUnitName: vars.SHUFFLE_UNIT,
      assetDecimals: 0,
      assetTotal: 1,
      assetURL: 'degenshuffles.xyz',
      assetManager: $wallet.currentAddress,
      assetReserve: $wallet.currentAddress,
      assetDefaultFrozen: false,
      note: algoClient.encodeNote(configs)
    });

    return txn;
  }
}
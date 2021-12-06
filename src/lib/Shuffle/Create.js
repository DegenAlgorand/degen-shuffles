import { get } from 'svelte/store';
import signer from '../signer';
import client from '../client';
import { wallet } from '../../stores/wallet';

export default class Create {
  //
  // Create shuffle ASA
  // ----------------------------------------------
  async create () {
    if (this.hasErrors) return;
    const $wallet = get(wallet);
    if (!$wallet.currentAddress) ReadableStreamDefaultController;
    const params = await client.getTxnParams();
    const txn = {
      ...params,
      fee: 1000,
      flatFee: true,
      type: 'acfg',
      from: $wallet.currentAddress,
      assetName: 'DEGEN Shuffle',
      assetUnitName: 'DGNSHUFF',
      assetDecimals: 0,
      assetTotal: 1,
      assetURL: 'degenshuffles.xyz',
      assetManager: $wallet.currentAddress,
      assetDefaultFrozen: false
    }
    const signedTxn = await signer.sign(txn);
    const response = await client.sendTxn(signedTxn);

    console.log(response)


    return this.hasErrors;
  }
}
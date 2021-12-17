import { get } from 'svelte/store';
import algoClient from '../algoClient';
import { wallet } from '../../stores/wallet';


export default class OptIn {
  constructor() {
    this.optIns = [];
  }

  //
  // Check if current wallet has opted in
  // ----------------------------------------------
  get optedIn() {
    const $wallet = get(wallet);
    if (!$wallet.currentAddress || !this.optIns.length) return false;
    return this.optIns.includes($wallet.currentAddress);
  }

  //
  // Opt In current shuffle  // ----------------------------------------------
  async optIn () {
    if (this.hasErrors) return;
    const $wallet = get(wallet);
    if (!$wallet.currentAddress) return;

    const txn = await algoClient.txn({
      type: 'axfer',
      from: $wallet.currentAddress,
      to: $wallet.currentAddress,
      assetIndex: this.configs.assetId,
      amount: 0,
    });
    if (!txn) return;
    this.optIns.push($wallet.currentAddress);
    this.dispatchUpdate();
    return txn;
  }


   //
  // Opt out current shuffle
  // ----------------------------------------------
  async optOut () {
    if (this.hasErrors) return;
    const $wallet = get(wallet);
    if (!$wallet.currentAddress) return;

    const txn = await algoClient.txn({
      type: 'axfer',
      from: $wallet.currentAddress,
      to: $wallet.currentAddress,
      closeRemainderTo: this.configs.creatorAddress,
      assetIndex: this.configs.assetId,
      amount: 0,
    });
    if (!txn) return;
    this.optIns = this.optIns.filter(address => address !== $wallet.currentAddress);
    this.dispatchUpdate();
    return txn;
  }
}
import { get } from 'svelte/store';
import algoClient from '../algoClient';
import { wallet } from '../../stores/wallet';
import holders from '../../lib/holders';
import vars from '../../vars';



export default class Picker {
  //
  // pick winners
  // ----------------------------------------------
  async pick (qty) {
    if (!qty) return false;
    let winners = [];
    let addresses = [...holders.all];
    // require opt-ins?
    if (this.configs.requireOptin) {
      addresses = addresses.filter(account => this.optIns.includes(account.address))
    }
    // can the shuffle creator win?
    if (!this.configs.creatorCanWin) {
      addresses = addresses.filter(account => account.address !== this.configs.creatorAddress);
    }
    // calculate weights
    addresses.forEach(account => {
      account.weight = account.amount;
      // use log scale?
      if (this.configs.useLogScale){
        account.weight = Math.log(account.weight);
      }
    });
    // loop to pick winners
    for (let q=0; q<qty; q++) {
      let total = 0;
      addresses.forEach(account => { total += account.weight });
      const selected = Math.random() * total;
      let winner = undefined;
      let current = 0;
      for (let i=0; i<addresses.length; i++) {
        current += addresses[i].weight;
        if( selected <= current) {
          winner = addresses[i];
          break;
        }
        winner = addresses[i];
      }
      winners.push(winner);
      addresses = addresses.filter(account => account.address !== winner.address);
      if (!addresses.length) break;
    }
    // Pop error if no winner found
    if (!winners.length){
      this.popError('No winner picked... Please try again. If the problem persists, contact the Degen team');
      return false;
    }
    // Save winners
    const txn = await this.saveWinners(winners);

    return ;
  }


  //
  // Save winners on chain
  // ----------------------------------------------
  async saveWinners (winners = []) {

    console.log(winners);
    // const txn = await algoClient.txn({
    //   fee: 1000,
    //   flatFee: true,
    //   type: 'acfg',
    //   from: $wallet.currentAddress,
    //   assetName: this.configs.assetName,
    //   assetUnitName: vars.SHUFFLE_UNIT,
    //   assetDecimals: 0,
    //   assetTotal: 1,
    //   assetURL: 'degenshuffles.xyz',
    //   assetManager: $wallet.currentAddress,
    //   assetReserve: $wallet.currentAddress,
    //   assetDefaultFrozen: false,
    //   note: algoClient.encodeNote(configs)
    // });
  }
}
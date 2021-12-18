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
      // decrease previous wins?
      if (this.configs.decreasePrevWinners) {
        account.previousWins = this.getWinnerCount(account.address);
        account.weight = account.weight / (account.previousWins + 1);
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
    if (!txn) {
      this.popError('Oops... Could not save winners to blockchain');
      return;
    }
    this.dispatchUpdate();
    return txn;
  }


  //
  // Save winners on chain
  // ----------------------------------------------
  async saveWinners (winners = []) {
    const round = {
      _type: 'winners',
      round: this.currentWinnersRound + 1,
      winners: winners.map(account => ({
        address: account.address,
      })),
    }
    const txn = await algoClient.txn({
      assetIndex: this.configs.assetId,
      amount: 0,
      type: 'axfer',
      from: this.configs.creatorAddress,
      to: this.configs.creatorAddress,
      note: algoClient.encodeNote(round)
    });
    if (txn) {
      this.addWinnersRound(round);
    }
    return txn;
  }
}
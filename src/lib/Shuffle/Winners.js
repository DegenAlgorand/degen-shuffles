import algoClient from '../algoClient';
import vars from '../../vars';


export default class Winners {
  constructor() {
    this.rounds = [];
    this.winners = [];
  }

  //
  // Get winners history for current shuffle
  // ----------------------------------------------
  async getWinnersHistory () {
    // get asset config transactions
    const winnersTxns = await algoClient.lookupAssetTransactions(this.configs.assetId, {
      'address': this.configs.creatorAddress,
      'address-role': 'sender',
      'tx-type': 'axfer',
      'note-prefix': vars.WINNERS_NOTE_PREFIX,
    });

    const hasTransactions = winnersTxns && winnersTxns.transactions && winnersTxns.transactions.length;
    if (!hasTransactions) return false;

    let rounds = winnersTxns.transactions.map(transaction => algoClient.decodeNote(transaction.note));    
    rounds.forEach(round => { 
      this.addWinnersRound(round);
    });

    this.dispatchUpdate();
    return this.winners;
  }


  //
  // Add winner round
  // ----------------------------------------------
  addWinnersRound(round) {
    if (!round || !round.round || !round.winners) return;
    this.rounds.push(round);
    this.rounds.sort((a, b) => b.round - a.round)
    for(let i=0; i<round.winners.length; i++) {
      const roundWinner = round.winners[i];
      const winnerIndex = this.winners.findIndex(winner => winner.address === roundWinner.address)
      if (winnerIndex === -1) {
        this.winners.push({
          address: roundWinner.address,
          count: 1,
        });
      }
      else {
        this.winners[winnerIndex].count += 1;
      }
    }
  }

  //
  // get winner count
  // ----------------------------------------------
  getWinnerCount(address) {
    if (!this.winners.length) return 0;
    const previousWins = this.winners.find(winner => winner.address === address);
    if (!previousWins) return 0;
    return previousWins.count;
  }

  //
  // get current winners round
  // ----------------------------------------------
  get currentWinnersRound() {
    if (!this.rounds.length) return 0;
    const currentRound = this.rounds.reduce((max, round) => (
      round.round > max ? round.round : max 
    ), 0);
    return currentRound;
  }
}
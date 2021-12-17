import algoClient from '../algoClient';
import vars from '../../vars';


export default class Read {
  //
  // Get all holders
  // ----------------------------------------------
  async getHolders () {
    const response = await algoClient.lookupAssetBalances(vars.DEGEN_ASSET_ID, {
      'currency-greater-than': 0,
    });
    if (!response || !response.balances) return this.all;
    this.all = response.balances
      .filter(account => account.address !== vars.DEGEN_LP_ADDRESS)
      .sort((a,b) => b.amount - a.amount);
    this.dispatchUpdate()
    return this.all;
  }


  //
  // Get amount for a single address
  // ----------------------------------------------
  getAmount(address) {
    const account = this.all.find(account => account.address === address);
    if (!account) return 0;
    return account.amount;
  }

  //
  // check if an account holds $degen
  // ----------------------------------------------
  isHolder(address) {
    return !!this.getAmount(address);
  }
}

import { wallet } from '../../stores/wallet';

export default class Connect {
  //
  // Connect wallet
  // ----------------------------------------------
  async connect () {
    try {
      const accounts = await this.myAlgo.connect();
      const addresses = accounts.map(account => account.address);
      wallet.update(store => ({
        ...store,
        addresses,
        currentAddress:  addresses[0],
      }));
    } catch (err) {
      console.error(err);
    }
  }
  //
  // Disonnect wallet
  // ----------------------------------------------
  disconnect () {
    wallet.set({});
  }

  //
  // Sign
  // ----------------------------------------------
  async sign (txn) {
    try {
      const signedTxn = await this.myAlgo.signTransaction(txn);
      return signedTxn;
    }
    catch (err) {
      console.error(err);
    }
  } 
 
}
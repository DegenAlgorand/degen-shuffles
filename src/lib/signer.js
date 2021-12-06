import { wallet } from '../stores/wallet';

class Signer {
  constructor () {
    this.signer = undefined;
    this.init = this.init.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  //
  // Get current signer methods
  // ----------------------------------------------
  async init () {
    if (this.signer) return;
    if (!window || !window.MyAlgoConnect) return;
    this.signer = new window.MyAlgoConnect();
  }


  //
  // Connect wallet
  // ----------------------------------------------
  async connect () {
    if (!this.signer) await this.init();
    try {
      const accounts = await this.signer.connect();
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
  // Sign
  // ----------------------------------------------
  async sign (txn) {
    if (!this.signer) await this.init();
    try {
      const signedTxn = await this.signer.signTransaction(txn);
      return signedTxn;
    }
    catch (err) {
      console.error(err);
    }
  } 


  //
  // Disonnect wallet
  // ----------------------------------------------
  disconnect () {
    wallet.set({});
  }

}

export default new Signer();


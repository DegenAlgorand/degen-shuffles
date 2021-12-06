
class Client {
  constructor () {
    this.client = undefined;
    this.init = this.init.bind(this);

  }

  //
  // Get current signer methods
  // ----------------------------------------------
  async init () {
    if (this.client) return;
    if (!window || !window.algosdk) return;
    this.client = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');
  }


  //
  // Get txn params
  // ----------------------------------------------
  async getTxnParams () {
    if (!this.client) await this.init();
    try {
      const txn = await this.client.getTransactionParams().do();
      return txn;
      
    } catch (err) {
      console.error(err);
    }
  }

  //
  // Send transaction
  // ----------------------------------------------
  async sendTxn (signedTxn) {
    if (!this.client) await this.init();
    try {
      const txn = await this.client.sendRawTransaction(signedTxn.blob).do();
      return txn;
      
    } catch (err) {
      console.error(err);
    }
  }


}

export default new Client();


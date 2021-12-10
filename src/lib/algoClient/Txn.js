import { loading } from '../../stores/ui'
export default class Txn {

  //
  // Transaction
  // ----------------------------------------------
  async txn(txn) {
    try {
      loading.set('Creating transaction...');
      const params = await this.getTxnParams();
      txn = {
        ...params,
        ...txn,
      }
      loading.set('Signing transaction...');
      const signedTxn = await this.signTxn(txn);
      loading.set('Sending transaction...');
      const response = await this.sendTxn(signedTxn);
      loading.set('Waiting for confirmation...');
      const confirmation = await this.wait(this.algoSdk, response.txId, 10);
      return confirmation;
    }
    catch (error) {
      console.dir(error);
      this.popError(error.message);
    }
  }

  //
  // Get txn params
  // ----------------------------------------------
  async getTxnParams () {
    const txn = await this.algoSdk.getTransactionParams().do();
    return txn;
  }

  //
  // Send transaction
  // ----------------------------------------------
  async sendTxn (signedTxn) {
    const txn = await this.algoSdk.sendRawTransaction(signedTxn.blob).do();
    return txn;
  }

  // Sign
  // ----------------------------------------------
  async signTxn (txn) {
    const signedTxn = await this.myAlgo.signTransaction(txn);
    return signedTxn;
  } 

  
}
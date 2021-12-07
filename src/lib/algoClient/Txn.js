export default class Txn {

  //
  // Transaction
  // ----------------------------------------------
  async txn(txn) {
    const params = await this.getTxnParams();
    txn = {
      ...params,
      ...txn,
    }
    const signedTxn = await this.signTxn(txn);
    const response = await this.sendTxn(signedTxn);
    return response;
  }

  //
  // Get txn params
  // ----------------------------------------------
  async getTxnParams () {
    try {
      const txn = await this.algoSdk.getTransactionParams().do();
      return txn;
      
    } catch (err) {
      console.error(err);
    }
  }

  //
  // Send transaction
  // ----------------------------------------------
  async sendTxn (signedTxn) {
    try {
      console.log(signedTxn.blob)
      const txn = await this.algoSdk.sendRawTransaction(signedTxn.blob).do();
      return txn;
      
    } catch (err) {
      console.error(err);
    }
  }

  // Sign
  // ----------------------------------------------
  async signTxn (txn) {
    try {
      const signedTxn = await this.myAlgo.signTransaction(txn);
      return signedTxn;
    }
    catch (err) {
      console.error(err);
    }
  } 

  
}
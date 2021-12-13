export default class Init {
  constructor () {
    this.apiUrl = 'https://api.testnet.algoexplorer.io';
    this.indexerUrl = 'https://api.testnet.algoexplorer.io/idx2';

    this.myAlgo = undefined;
    this.algoSdk = undefined;
  }

  init () {
    if (!window || !window.MyAlgoConnect) return;
    if (!window || !window.algosdk) return;
    this.myAlgo = new window.MyAlgoConnect();
    this.algosdk = window.algosdk;
    this.algod = new this.algosdk.Algodv2('', this.apiUrl, '');  
  }
}



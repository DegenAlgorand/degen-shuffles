export default class Init {
  constructor () {
    this.apiUrl = 'https://api.testnet.algoexplorer.io';
    this.indexerUrl = 'https://api.testnet.algoexplorer.io/idx2';

    this.myAlgo = undefined;
    this.algoSdk = undefined;
    this.msgpack = undefined;
  }

  init () {
    if (!window || !window.MyAlgoConnect) return;
    if (!window || !window.algosdk) return;
    if (!window || !window.msgpack) return;
    this.myAlgo = new window.MyAlgoConnect();
    this.algoSdk = new algosdk.Algodv2('', this.apiUrl, '');

    this.wait = algosdk.waitForConfirmation;
    this.msgpack = window.msgpack;
   
  }
}



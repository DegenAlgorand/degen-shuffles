
export default class Init {
  constructor () {
    this.apiUrl = 'https://api.testnet.algoexplorer.io';
    this.myAlgo = undefined;
    this.algoSdk = undefined;
  }

  init () {
    if (!window || !window.MyAlgoConnect) return;
    if (!window || !window.algosdk) return;
    this.myAlgo = new window.MyAlgoConnect();
    this.algoSdk = new algosdk.Algodv2('', this.apiUrl, '');
  }
}


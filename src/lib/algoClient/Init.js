import { API_URL } from '../../vars';

export default class Init {
  constructor () {
    this.myAlgo = undefined;
    this.algoSdk = undefined;
  }

  init () {
    if (!window || !window.MyAlgoConnect) return;
    if (!window || !window.algosdk) return;
    this.myAlgo = new window.MyAlgoConnect();
    this.algosdk = window.algosdk;
    this.algod = new this.algosdk.Algodv2('', API_URL, '');  
  }
}



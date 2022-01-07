import vars from '../../vars';

export default class Init {
  constructor () {
    this.myAlgo = undefined;
    this.algoSdk = undefined;
    this.ready = true;
    this.queue = [];
  }

  //
  // Init
  // ----------------------------------------------
  init () {
    if (!window || !window.MyAlgoConnect) return;
    if (!window || !window.algosdk) return;
    this.myAlgo = new window.MyAlgoConnect();
    this.algosdk = window.algosdk;
    this.algod = new this.algosdk.Algodv2(vars.API_KEY || '', vars.API_URL, '');
    this.ready = true;
    if (this.queue.length) {
      this.queue.forEach(callback => {
        callback(this);
      });
      this.queue = [];
    }
  }

  //
  // On init event
  // ----------------------------------------------
  onInit(callback) {
    if (typeof callback !== 'function') return;
    if (this.ready){
      callback(this);
      return;
    }
    this.queue.push(callback);
  }

}



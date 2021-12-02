import { get } from 'svelte/store';
import { wallet } from '../../stores/wallet';
import * as myalgo from './myAlgo';

class Signer {
  constructor () {
    const $wallet = get(wallet);
    this.type = $wallet.type || 'myalgo';
    this.methods = {
      myalgo,
    }
  }

  //
  // Get current signer methods
  // ----------------------------------------------
  get signerInit () {
    if (typeof this.methods[this.type].init === 'function') {
      return this.methods[this.type].init;
    }
    return false;
  }
  get signerConnect() {
    if (typeof this.methods[this.type].connect === 'function') {
      return this.methods[this.type].connect;
    }
    return false;
  }

  //
  // Select a signer type
  // ----------------------------------------------
  async select (type) {
    this.type = type;
    wallet.update(store => ({ ...store, type }));
  }

  

  //
  // Connect wallet
  // ----------------------------------------------
  async connect () {
    if (this.signerInit) await this.signerInit();
    if (!this.signerConnect) return; 
    const addresses = await this.signerConnect();
    wallet.update(store => ({
      ...store,
      addresses,
      currentAddress:  addresses[0],
    }));
  }
}

export default new Signer();


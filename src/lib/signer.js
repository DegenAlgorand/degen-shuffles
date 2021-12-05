import { get } from 'svelte/store';
import { wallet } from '../stores/wallet';

class Signer {
  constructor () {
    this.client = undefined;
    this.init = this.init.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  //
  // Get current signer methods
  // ----------------------------------------------
  async init () {
    if (this.client) return;
    const MyAlgoConnect = await import('@randlabs/myalgo-connect');
    this.client = new MyAlgoConnect.default()
  }

  //
  // Connect wallet
  // ----------------------------------------------
  async connect () {
    if (!this.client) await this.init();
    try {
      const accounts = await this.client.connect();
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
  // Disonnect wallet
  // ----------------------------------------------
  disconnect () {
    wallet.set({});
  }
}

export default new Signer();


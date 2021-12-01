import { writable } from 'svelte/store';
import { persist, localStorage } from "@macfja/svelte-persistent-store"

let myAlgoWallet;
export const wallet = persist(writable({}), localStorage(), 'wallet');

//
// Init MyAlgo Connect
// ----------------------------------------------
export async function initMyAlgoConnect() {
  if (myAlgoWallet) return;
  const MyAlgoConnect = await import('@randlabs/myalgo-connect');
  myAlgoWallet = new MyAlgoConnect.default()
}

//
// Connect wallet
// ----------------------------------------------
export async function connectWallet() {
  if (!myAlgoWallet) myAlgoWallet = new MyAlgoConnect();
  try {
    const accounts = await myAlgoWallet.connect();
    const addresses = accounts.map(account => account.address);
    wallet.update(store => ({
      ...store,
      address: addresses[0],
    }));
    
  } catch (err) {
    console.error(err);
  }
}

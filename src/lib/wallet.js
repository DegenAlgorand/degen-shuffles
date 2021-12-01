import { writable } from 'svelte/store';

let myAlgoWallet;
export const wallet = writable({});

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
    console.log(addresses, accounts);
    
  } catch (err) {
    console.error(err);
  }
}

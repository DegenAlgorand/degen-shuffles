let myAlgoWallet;

//
// Init MyAlgo Connect
// ----------------------------------------------
export async function init() {
  if (myAlgoWallet) return;
  const MyAlgoConnect = await import('@randlabs/myalgo-connect');
  myAlgoWallet = new MyAlgoConnect.default()
}

//
// Connect wallet
// ----------------------------------------------
export async function connect() {
  if (!myAlgoWallet) myAlgoWallet = new MyAlgoConnect();
  try {
    const accounts = await myAlgoWallet.connect();
    const addresses = accounts.map(account => account.address);
    return addresses;
    
  } catch (err) {
    console.error(err);
  }
}

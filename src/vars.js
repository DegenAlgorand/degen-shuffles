const mode = 'MAINNET';

const shared = {
  SHUFFLE_UNIT: 'DGNSHUFF',
  MIN_AMOUNT_TO_CREATE: 420,
  WINNERS_NOTE_PREFIX: 'g6VfdHlwZad3aW5uZXJz', // json starting with: { "_type": "winners",  
}

const testnet = {
  API_URL: 'https://node.testnet.algoexplorerapi.io',
  INDEXER_URL: 'https://algoindexer.testnet.algoexplorerapi.io',
  DEGEN_ASSET_ID: '52327125',
  DEGEN_LP_ADDRESS: '3X3LP2EGKUI3YHRMGBC2TWSSNYPXIKSECSCVYU5H3G642RQE74XX2DU6BQ',
}

const mainnet = {
  API_URL: 'https://node.algoexplorerapi.io',
  INDEXER_URL: 'https://algoindexer.algoexplorerapi.io',
  DEGEN_ASSET_ID: '417708610',
  DEGEN_LP_ADDRESS: 'HPSDZOIBAPREKKIKWDLKRKLQKFOFU3KH6NGVS3YGVZD3E7ZIK2ZPKYSRNU',
}

export default {
  ...shared,
  ...(mode === 'TESTNET' ? testnet : mainnet),
}
import algoClient from '../algoClient';
import vars from '../../vars';


export default class Update {

  async add(shuffle = {}) {
		if (!shuffle.configs) return;
		this.all.push({
			assetId: shuffle.configs.assetId,
			assetName: shuffle.configs.assetName,
			creatorAddress: shuffle.configs.creatorAddress,
		});
		this.dispatchUpdate();
  }
}

import algoClient from '../algoClient';
import vars from '../../vars';


export default class Read {

  async getAllShuffles() {
    const response = await algoClient.searchForAssets({
			unit: vars.SHUFFLE_UNIT,
		});
		if (!response.assets) return this.all;
		const allShuffles = response.assets
			.filter(asset => (
				asset.params.total === 1
				&& asset.params.decimals === 0 
			))
			.map(asset => ({
				assetId: asset.index,
				assetName: asset.params.name,
				creatorAddress: asset.params.creator,
			}))
		this.all = allShuffles;
    this.dispatchUpdate();
		return this.all
  }
}

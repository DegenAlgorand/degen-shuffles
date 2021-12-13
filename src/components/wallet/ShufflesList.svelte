<script>
  import { tick } from 'svelte';
  import { wallet } from '../../stores/wallet';
  import { shuffles } from '../../stores/shuffles';
  import algoClient from '../../lib/algoClient';
  import { SHUFFLE_UNIT } from '../../vars';

  let prevAddress = '';
  $: $wallet.currentAddress, $shuffles, getAccountShuffles();


  async function getAccountShuffles() {
    if (prevAddress === $wallet.currentAddress) return;
    prevAddress = $wallet.currentAddress;
    if ($shuffles === undefined) await getAllShuffles();
    await tick();
    if (!$shuffles.length) return;
    if (!$wallet.currentAddress) return;
    const response = await algoClient.lookupAccountByID($wallet.currentAddress);
    const assets = response.account.assets;
    if (!assets || !assets.length) return;
    const walletAssetsIds = assets.map( asset => asset['asset-id']);
    $wallet.shuffles = $shuffles.filter(asset => walletAssetsIds.includes(asset.assetId));
    console.log($wallet.shuffles);
  }


  async function getAllShuffles() {
    const response = await algoClient.searchForAssets({
			unit: SHUFFLE_UNIT,
		});
		if (!response.assets) return;
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
		shuffles.set(allShuffles);
  }

</script>

<style lang="scss">
  ul {
    margin-bottom: 2em;
  }
  li {
    display: block;
    margin-bottom: 1em;
  }
  .btn {
    width: 100%;
  }
</style>

{#if $wallet.currentAddress }
  {#if $wallet.shuffles && $wallet.shuffles.length}
    <h2 class="menu-title">
      Your shuffles
    </h2>

    <ul>
      {#each $wallet.shuffles as shuffle}
        <li>
          <a class="ghost-btn" href="/shuffle?id={shuffle.assetId}">
            {shuffle.assetId}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
{/if}
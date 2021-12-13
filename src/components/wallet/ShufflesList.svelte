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
  @import '../../styles/variables';
  ul {
    margin-bottom: 2em;
  }
  li {
    display: block;
    padding: 1em 0;
    border-bottom: 1px solid $border-color;
    &:first-child {
      border-top: 1px solid $border-color;
    }
  }
  .text-link {
    .asset-id {
      font-size: 0.75em;
      margin-left: 0.25em;
    }
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
          <a class="text-link" href="/shuffle?id={shuffle.assetId}">
            <span class="name">{shuffle.assetName}</span>
            <span class="asset-id">({shuffle.assetId})</span>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
{/if}
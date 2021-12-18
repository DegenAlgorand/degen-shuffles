<script>
  import { wallet } from '../../stores/wallet';
  import shuffles from '../../lib/shuffles';
  import { showWalletMenu } from '../../stores/ui';
  import algoClient from '../../lib/algoClient';
  import Loading from '../elements/LoadingInline.svelte';

  let loading = false;
  let prevAddress = '';
  $: $wallet.currentAddress, $shuffles, getAccountShuffles();

  function closeMenu() {
    showWalletMenu.set(false);
  }


  async function getAccountShuffles() {
    if (prevAddress === $wallet.currentAddress) return;
    loading = true;
    prevAddress = $wallet.currentAddress;
    if (!shuffles.all.length || !$wallet.currentAddress) {
      loading = false;
      return;
    }
    const response = await algoClient.lookupAccountByID($wallet.currentAddress);
    const assets = response.account.assets;
    if (!assets || !assets.length) {
      loading = false;
      return;
    } 
    const walletAssetsIds = assets.map( asset => asset['asset-id']);
    $wallet.shuffles = shuffles.all.filter(asset => walletAssetsIds.includes(asset.assetId));
    loading = false;
  }

</script>

<style lang="scss">
  ul {
    margin-bottom: 2em;
  }
  li {
    display: block;
    padding: 1em 0;
    border-bottom: 1px solid var(--border-color);
    &:first-child {
      border-top: 1px solid var(--border-color);
    }
  }
  .text-link {
    .asset-id {
      font-size: 0.75em;
      margin-left: 0.25em;
    }
  }
  .creator-icon {
    margin-right: 0.5em;
  }
</style>

{#if $wallet.currentAddress }

  {#if loading}
    <Loading />
  {:else}
    {#if $wallet.shuffles && $wallet.shuffles.length}
      <h2 class="menu-title">
        Your shuffles
      </h2>

      <ul>
        {#each $wallet.shuffles as shuffle}
          <li>
            <a 
              class="text-link" 
              href="/shuffle?id={shuffle.assetId}" 
              on:click={closeMenu}
            >
              {#if shuffle.creatorAddress === $wallet.currentAddress}
                <i class="creator-icon fas fa-clipboard-list"></i>
              {/if}
              <span class="name">{shuffle.assetName}</span>
              <span class="asset-id">({shuffle.assetId})</span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  {/if}

{/if}
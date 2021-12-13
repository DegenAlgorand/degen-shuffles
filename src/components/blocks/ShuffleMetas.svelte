<script>
  import { shortenAddress } from '../../helpers/address';
  export let shuffle = {};
  const configs = shuffle.configs;
</script>

<style lang="scss">
  @import '../../styles/variables';
  .meta {
    margin: 0 0 2em;
    padding: 1em 0;
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
  }
</style>

{#if configs}
  <ul class="meta">
    <li class="asaId">
      <span class="label">
        Asset ID: 
      </span>
      <span class="value">
        <a class="text-link" href="https://algoexplorer.io/asset/{configs.assetId}" target="_blank">
          { configs.assetId }
        </a>
      </span>
    </li>

    <li class="creator">
      <span class="label">
        Creator: 
      </span>
      <span class="value">
        <a class="text-link" href="https://algoexplorer.io/address/{configs.creatorAddress}" target="_blank">
          { shortenAddress(configs.creatorAddress) }
        </a>
      </span>
    </li>
  </ul>
{/if}
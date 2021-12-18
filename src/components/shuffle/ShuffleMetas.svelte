<script>
  import { shortenAddress } from '../../helpers/address';
  export let shuffle = {};
  const configs = shuffle.configs;

  
</script>

<style lang="scss">
  .meta {
    margin: 0 0 2em;
    padding: 1em 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    row-gap: 0.5em;
  }
  .label {
    font-weight: bold;
  }
  .icon {
    color: var(--red);
    margin-right: 0.5em;
  }
</style>

{#if configs}
  <div class="container">
    <ul class="meta columns">
      <li>
        <span class="label">
          Asset ID: 
        </span>
        <span class="value">
          <a class="text-link" href="https://algoexplorer.io/asset/{configs.assetId}" target="_blank">
            { configs.assetId }
          </a>
        </span>
      </li>

      <li>
        <span class="label">
          Creator: 
        </span>
        <span class="value">
          <a class="text-link" href="https://algoexplorer.io/address/{configs.creatorAddress}" target="_blank">
            { shortenAddress(configs.creatorAddress) }
          </a>
        </span>
      </li>

      {#if configs.requireOptin}
        <li>
          <span class="label">
            <i class="icon fas fa-check-square"></i> Opt-in required
          </span>
        </li>
      {:else}
        <li>
          <span class="label">
            <i class="icon fas fa-check-square"></i> No opt-in required. Every holder can win.
          </span>
        </li>
      {/if}

      {#if configs.decreasePrevWinners}
        <li>
          <span class="label">
            <i class="icon fas fa-check-square"></i> Decrease previous winners odds
          </span>
        </li>
      {/if}

      {#if configs.useLogScale}
        <li>
          <span class="label">
            <i class="icon fas fa-check-square"></i> Use logarithmic scale
          </span>
        </li>
      {/if}
    </ul>
  </div>
{/if}
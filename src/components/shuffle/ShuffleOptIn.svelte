<script>
  import { wallet } from '../../stores/wallet';
  import { loading } from '../../stores/ui';
  export let shuffle = {};
  const configs = shuffle.configs;
  
  async function optIn() {
    loading.set(true);
    const txn = await shuffle.optIn();
    loading.set(false);
  }

  async function optOut() {
    loading.set(true);
    const txn = await shuffle.optOut();
    loading.set(false);
  }

</script>

<style lang="scss">
  .wrapper {
    text-align: center;
    margin: 1rem 0 0;
  }
  .opt-out {
    margin-top: 0.5em;
    font-size: 0.75em;
  }
</style>


{#if configs.requireOptin && configs.creatorAddress !== $wallet.currentAddress }
  <div class="wrapper">
    {#if shuffle.optedIn }
      <span class="fake-btn">
        Opted In!
      </span>
      <div class="opt-out">
        <button class="text-link" on:click|preventDefault={optOut}>
          Opt out
        </button>
      </div>
    {:else}
      <button class="primary-btn" on:click|preventDefault={optIn}>
        Opt In!
      </button>
    {/if}
  </div>
{/if}

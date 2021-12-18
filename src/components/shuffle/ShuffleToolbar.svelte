<script>
  import { wallet } from '../../stores/wallet';
  import popup from '../../lib/popup';
  import ShuffleConfigs from './ShuffleConfigs.svelte';
  import ShufflePicker from './ShufflePicker.svelte';
  export let shuffle = {};
  const isCreator = $wallet.currentAddress === shuffle.configs.creatorAddress;

  function editConfigs() {
    popup.open(ShuffleConfigs, {mode: 'edit', shuffle});
  }

  function pickWinners() {
    popup.open(ShufflePicker, {shuffle});
  }

</script>

<style lang="scss">
  .container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875em;
  }
</style>

{#if isCreator}
  <div class="container">
    <button class="btn" on:click|preventDefault={editConfigs} >
      Edit
    </button>

    <button class="primary-btn" on:click|preventDefault={pickWinners} >
      Pick winners
    </button>
  </div>
{/if}
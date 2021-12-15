<script>
  import { wallet } from '../../stores/wallet';
  import popup from '../../lib/popup';
  import ShuffleConfigs from '../forms/ShuffleConfigs.svelte';
  export let shuffle = {};
  const isCreator = $wallet.currentAddress === shuffle.configs.creatorAddress;

  function editConfigs() {
    popup.open(ShuffleConfigs, {mode: 'edit', shuffle});
  }

</script>

<style lang="scss">
  
</style>

{#if isCreator}
  <div class="container">
    <button class="btn" on:click|preventDefault={editConfigs} >
      Edit
    </button>
  </div>
{/if}
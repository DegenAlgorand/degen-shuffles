<script>
  import { wallet } from '../../stores/wallet';
  export let shuffle = {};
  const isCreator = $wallet.currentAddress === shuffle.configs.creatorAddress;
</script>

<style lang="scss">
  
</style>

{#if isCreator}
  <div class="container">
    <button class="btn">
      Edit
    </button>
  </div>
{/if}
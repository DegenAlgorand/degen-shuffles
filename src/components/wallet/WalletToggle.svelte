<script>
  import { wallet } from '../../lib/wallet';
  import { showWalletMenu } from '../../stores/ui';
  import { tinifyAddress } from '../../helpers/address';

  function toggleWalletPanel() {
    showWalletMenu.set(!$showWalletMenu);
  }
</script>

<style lang="scss">
  .btn i {
    margin: 0;
  }
</style>

<button class="btn" on:click|preventDefault={ toggleWalletPanel }>
  {#if !$showWalletMenu}
    {#if !$wallet.address}
      Connect
    {:else}
      { tinifyAddress($wallet.address) }
    {/if}
  {:else}
    <i class="fas fa-times"></i>
  {/if}
</button>
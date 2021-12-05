<script>
  import { wallet } from '../../stores/wallet';
  import { showWalletMenu } from '../../stores/ui';
  import { shortenAddress } from '../../helpers/address';

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
    {#if !$wallet.currentAddress}
      Connect
    {:else}
      { shortenAddress($wallet.currentAddress) }
    {/if}
  {:else}
    <i class="fas fa-times"></i>
  {/if}
</button>
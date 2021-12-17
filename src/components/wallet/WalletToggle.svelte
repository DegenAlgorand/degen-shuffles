<script>
  import { wallet } from '../../stores/wallet';
  import { showWalletMenu } from '../../stores/ui';
  import { shortenAddress } from '../../helpers/address';

  function toggleWalletPanel() {
    showWalletMenu.set(!$showWalletMenu);
  }
</script>

<style lang="scss">
  @import '../../styles/mixins';
  .btn i {
    margin: 0;
  }
  .btn-label {
    display: none;
    @include medium-screen {
      display: inline-block;
    }
  }
</style>

<button class="btn" on:click|preventDefault={ toggleWalletPanel }>
  {#if !$showWalletMenu}
    <i class="fas fa-user"></i>
    <span class="btn-label">
      {#if !$wallet.currentAddress}
        Connect
      {:else}
        { shortenAddress($wallet.currentAddress) }
      {/if}
    </span>
  {:else}
    <i class="fas fa-times"></i>
  {/if}
</button>
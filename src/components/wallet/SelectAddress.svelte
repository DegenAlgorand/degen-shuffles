<script>
  import { wallet } from '../../stores/wallet';
  import { shortenAddress } from '../../helpers/address';
  function selectAddress(address) {
    wallet.update(store => ({...store, currentAddress: address}));
  }
</script>

<style lang="scss">
  ul {
    margin-bottom: 2em;
  }
  li {
    display: block;
    margin-bottom: 1em;
  }
  .btn {
    width: 100%;
  }
</style>

<h2 class="menu-title">
  Your addresses
</h2>

{#if $wallet.addresses.length}
  <ul>
    {#each $wallet.addresses as address (address)}
      <li>
        <button class="btn" on:click|preventDefault={() => selectAddress(address)}>
          {#if address === $wallet.currentAddress}
            <i class="fas fa-check-circle"></i>
          {/if}
          { shortenAddress(address) }
        </button>
      </li>
    {/each}
  </ul>
{:else}
  <p>No addresses found for this wallet</p>
{/if}
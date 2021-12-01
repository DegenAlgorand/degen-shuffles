<script>
  import { onMount } from 'svelte';
  import { wallet, initMyAlgoConnect, connectWallet } from '../../lib/wallet';
  import { tinifyAddress } from '../../helpers/address';

  onMount(async () => {
    await initMyAlgoConnect();
  })
  async function connect() {
    await connectWallet();
  }
  function disconnect() {
    wallet.set({});
  }
</script>

<style lang="scss">
  
</style>

{#if !$wallet.address}
  <button class="btn" on:click|preventDefault={ connect }>
    Connect
  </button>
  
{:else}
  <button class="btn" on:click|preventDefault={ disconnect }>
    { tinifyAddress($wallet.address) }
  </button>
{/if}
<script>
  import { onMount } from 'svelte';
  import { initMyAlgoConnect, connectWallet } from '../../lib/wallet';

  onMount(async () => {
    await initMyAlgoConnect();
  })

  async function connect() {
    await connectWallet();
  }

</script>

<style lang="scss">
  
</style>


<button class="btn" on:click|preventDefault={ connect }>
  Connect Wallet
</button>
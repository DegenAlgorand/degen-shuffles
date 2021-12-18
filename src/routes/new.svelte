<script>
  import { wallet } from '../stores/wallet';
  import { shortenAddress } from '../helpers/address';
  import Banner from '../components/layout/Banner.svelte';
  import ShuffleConfigs from '../components/shuffle/ShuffleConfigs.svelte'; 
</script>

<style lang="scss">
  .container :global(form) {
    margin-top: 2em;
  } 
</style>


<Banner>
  <h1 class="page-title">
    New Shuffle
  </h1>
</Banner>

{#if $wallet.currentAddress }
  <div class="container">
    <p>
      Creating a shuffle will add an ASA to your wallet ({ shortenAddress($wallet.currentAddress) }). <br/> 
      This asset will be used to store the shuffle configs and winners history. 
    </p>

    <ShuffleConfigs mode="create" />
    
  </div>
  

{:else}
  <div class="container">
    <p>You must connect your wallet to create a shuffle.</p>
  </div>
{/if}
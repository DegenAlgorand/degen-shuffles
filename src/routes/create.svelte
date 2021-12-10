<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { omit } from 'lodash';
  import { wallet } from '../stores/wallet';
  import { loading, popup } from '../stores/ui';
  import { shortenAddress } from '../helpers/address';
  import Shuffle from '../lib/Shuffle';
  import Banner from '../components/blocks/Banner.svelte';
  import ShuffleConfigs from '../components/forms/ShuffleConfigs.svelte';
  import AssetCreated from '../components/popups/AssetCreated.svelte';

  
  const shuffle = new Shuffle();
  const formData = writable(shuffle.configs);
  setContext('form', formData);

  async function submit(e) {
    e.preventDefault();
    loading.set(true);
    shuffle.validateConfigs(omit($formData, ['errors']));
    formData.set({ ...shuffle.configs, errors: shuffle.errors }) 
    if (shuffle.hasErrors) { 
      loading.set(false);
      return;
    }

    const txn = await shuffle.create();
    console.log(txn);
    if (txn['asset-index']) {
      popup.set({
        component: AssetCreated, 
        props: {
          asaId: txn['asset-index'],
        },
      });
    }
    loading.set(false);
  }
</script>


<style lang="scss">
 
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

    <ShuffleConfigs on:submit={submit} />
    
  </div>
  

{:else}
  <div class="container">
    <p>You must connect your wallet to create a shuffle.</p>
  </div>
{/if}
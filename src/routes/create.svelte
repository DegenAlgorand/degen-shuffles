<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { omit } from 'lodash';
  import { wallet } from '../stores/wallet';
  import { loading } from '../stores/ui';
  import { shortenAddress } from '../helpers/address';
  import Shuffle from '../lib/Shuffle';
  import algoClient from '../lib/algoClient';
  import Banner from '../components/blocks/Banner.svelte';
  import ShuffleConfigs from '../components/forms/ShuffleConfigs.svelte';
  
  const shuffle = new Shuffle();
  const formData = writable(shuffle.configs);
  setContext('form', formData);

  async function submit(e) {
    e.preventDefault();
    loading.set(true);
    shuffle.validateConfigs(omit($formData, ['errors']));
    formData.set({ ...shuffle.configs, errors: shuffle.errors }) 
    if (shuffle.hasError) { 
      loading.set(false);
      return;
    }

    const aaa = await algoClient.lookupAssetBalances('49898747')
    console.log(aaa);
    return;

    const response = await shuffle.create();
    console.log(response)

    if (response.txId) {
      const asset = await algoClient.indexer.lookupTransactionByID(response.txId).do();
      console.log(asset)
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
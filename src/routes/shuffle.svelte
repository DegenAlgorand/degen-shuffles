<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { wallet } from '../stores/wallet';
  import { loading } from '../stores/ui';
  import { shortenAddress } from '../helpers/address';
  import Shuffle from '../lib/Shuffle';
  import Banner from '../components/blocks/Banner.svelte';
  import NotFound from './_error.svelte';
  
  const shuffle = new Shuffle();
  const { page } = stores();
  const { query } = $page;
  let notFound = false;
  let loaded = false;

  onMount(async () => {
    if (!query || !query.id) {
      notFound = true;
      return;
    }
    loading.set('Loading shuffle data...');
    const fetchSuccess = await shuffle.fetch(query.id);
    if (!fetchSuccess) {
      notFound = true;
    }
    loaded = true;
    loading.set(false);
  });



</script>


<style lang="scss">
 
</style>

{#if notFound}
  <NotFound status="Shuffle not found" />

{:else}

  {#if loaded}
    <Banner>
      <h1 class="page-title">
        {shuffle.configs.displayName || shuffle.configs.assetName}
      </h1>
    </Banner>

    <div class="container">
      
    </div>
  {/if}
{/if}
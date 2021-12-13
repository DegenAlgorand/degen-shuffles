<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { wallet } from '../stores/wallet';
  import { loading } from '../stores/ui';
  
  import Shuffle from '../lib/Shuffle';
  import Banner from '../components/blocks/Banner.svelte';
  import ShuffleMetas from '../components/blocks/ShuffleMetas.svelte';
  import NotFound from './_error.svelte';
  
  let shuffle;
  const { page } = stores();
  let notFound = false;
  let loaded = false;
  let mounted = false;
  let shuffleId = undefined;

  $: $page.query, fetchShuffle();
  onMount(() => {
    mounted = true;
    fetchShuffle();
  })
  

  async function fetchShuffle() {
    if (!mounted) return;
    if (!$page.query || !$page.query.id) {
      notFound = true;
      return;
    }
    loading.set('Loading shuffle data...');
    shuffle = new Shuffle();
    const fetchSuccess = await shuffle.fetch($page.query.id);
    if (!fetchSuccess) {
      notFound = true;
    }
    console.log(shuffle);
    shuffleId = shuffle.configs.assetId;
    loaded = true;
    loading.set(false);
  }






</script>


<style lang="scss">
 
</style>


{#if notFound}
  <NotFound status="Shuffle not found" />

{:else}
  {#if loaded}
    {#key shuffleId}
      <Banner>
        <h1 class="page-title">
          {shuffle.configs.assetName}
        </h1>
      </Banner>

      <div class="container">

        <ShuffleMetas {shuffle} />

        {#if shuffle.configs.description}
          <p>{shuffle.configs.description}</p>
        {/if}
      </div>
    {/key}
  {/if}
{/if}
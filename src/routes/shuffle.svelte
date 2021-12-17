<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { loading } from '../stores/ui';
  import Shuffle from '../lib/Shuffle';
  import Banner from '../components/layout/Banner.svelte';
  import ShuffleToolbar from '../components/shuffle/ShuffleToolbar.svelte';
  import ShuffleLinks from '../components/shuffle/ShuffleLinks.svelte';
  import ShuffleMetas from '../components/shuffle/ShuffleMetas.svelte';
  import NotFound from './_error.svelte';
  
  const { page } = stores();
  let shuffle = new Shuffle();
  let loaded = false;
  let mounted = false;
  let notFound = false;

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
    const success = await shuffle.read($page.query.id);
    if (!success) notFound = true;
    loaded = true;
    loading.set(false);
  }
</script>


{#if notFound}
  <NotFound status="Shuffle not found" />

{:else}
  {#if loaded}
    {#key $shuffle}
      <ShuffleToolbar {shuffle} />
      <Banner>
        <h1 class="page-title">
          {shuffle.configs.assetName}
        </h1>       
        <ShuffleLinks {shuffle} />
      </Banner>
      <ShuffleMetas {shuffle} />
      
      <div class="container">
        {#if shuffle.configs.description}
          <p>{shuffle.configs.description}</p>
        {/if}
      </div>
    {/key}
  {/if}
{/if}
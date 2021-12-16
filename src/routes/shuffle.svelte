<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { loading } from '../stores/ui';
  import { urlString, twitterUrl } from '../helpers/strings';
  
  import Shuffle from '../lib/Shuffle';
  import Banner from '../components/layout/Banner.svelte';
  import ShuffleToolbar from '../components/shuffle/ShuffleToolbar.svelte';
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
    if (!success) {
      notFound = true;
    }
    loaded = true;
    loading.set(false);
  }
</script>



<style lang="scss">
  .links {
    text-align: center;
    li {
      display: inline-block;
      margin: 0.5em 1em;
    }
  }
</style>



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

        {#if shuffle.configs.url || shuffle.configs.twitter }
          <ul class="links">
            <!-- website -->
            {#if shuffle.configs.url}
              <li>
                <a class="text-link" href={urlString(shuffle.configs.url)} target="_blank">
                  <i class="fas fa-link"></i> 
                  {shuffle.configs.url}
                </a>
              </li>    
            {/if}
            <!-- twitter -->
            {#if shuffle.configs.twitter}
              <li>
                <a class="text-link" href={twitterUrl(shuffle.configs.twitter)} target="_blank">
                  <i class="fab fa-twitter"></i> 
                  {shuffle.configs.twitter}
                </a>
              </li>    
            {/if}
          </ul>
        {/if}
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
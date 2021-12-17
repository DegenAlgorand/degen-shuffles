<script>
  import { urlString, twitterUrl } from '../../helpers/strings';
  export let shuffle = {};
  const configs = shuffle.configs;
  
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


{#if configs.url || configs.twitter }
  <ul class="links">
    <!-- website -->
    {#if configs.url}
      <li>
        <a class="text-link" href={urlString(configs.url)} target="_blank">
          <i class="fas fa-link"></i> 
          {configs.url}
        </a>
      </li>    
    {/if}
    <!-- twitter -->
    {#if configs.twitter}
      <li>
        <a class="text-link" href={twitterUrl(configs.twitter)} target="_blank">
          <i class="fab fa-twitter"></i> 
          {configs.twitter}
        </a>
      </li>    
    {/if}
  </ul>
{/if}

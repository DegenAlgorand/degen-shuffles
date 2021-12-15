<script>
  import { fade } from 'svelte/transition';
  import { loading } from '../../stores/ui';
</script>

<style lang="scss">
  @import '../../styles/variables';
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background: rgba($dark-blue, 0.4);
    backdrop-filter: blur(1px);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
  .wrapper {
    text-align: center;
  }
  .message {
    margin-top: 1em;
  }
  .spinner {
    width: 4rem;
    animation: spin 2000ms infinite forwards ease-in-out;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1080deg);
    }
  }
  
</style>


{#if $loading}
  <div 
    class="loading" 
    transition:fade|local={{duration: 300 }}
  >
    <div class="wrapper">
      <img 
        class="spinner"
        src="/images/degen-shuffles-white.svg" 
        alt="Loading..." 
      />
      {#if typeof $loading === 'string'}
        <div class="message">
          {$loading}
        </div>
      {/if}
    </div>
  </div>
{/if}
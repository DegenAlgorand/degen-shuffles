<script>
  import { fade } from 'svelte/transition';
  import { popup } from '../../stores/ui';
  export let onClose;
  
  function close() {
    if (typeof onClose === 'function') onClose();
    popup.set(null);
  }
  function handleKeydown(event) {
    if($popup && event.keyCode === 27) close();
	}
</script>

<style lang="scss">
  @import '../../styles/variables';
  @import '../../styles/mixins';
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 110;
    overflow: auto;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center; 
    padding: var(--container-padding);
  }
  .popup-content {
    margin: auto;
    background: #fff;
    max-width: var(--container-width);
    padding: var(--container-padding);
    position: relative;
    overflow: hidden;
    z-index: 2;
    border-radius: 0.5rem;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: rgba($dark-blue, 0.4);
    backdrop-filter: blur(1px);
  }
</style>

<svelte:window on:keydown={handleKeydown}/>

{#if $popup }
  <section 
    class="popup" 
    transition:fade="{{ duration: 200 }}" 
    on:click|self={close}
  >
    <div class="popup-content" role="dialog">
      <svelte:component 
        this={$popup.component} 
        {...$popup.props}
        on:close={close}
      />   
    </div>

    <div class="overlay"></div>
  </section>
{/if}

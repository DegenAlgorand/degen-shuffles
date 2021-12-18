<script>
  import { fade } from 'svelte/transition';
  import popup from '../../lib/popup';
  export let onClose;

  function close() {
    if (typeof onClose === 'function') onClose();
    popup.close();
  }
  function handleKeydown(event) {
    if(popup.isActive && event.keyCode === 27) close();
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
    width: 100%;
    max-width: var(--container-width);
    position: relative;
    z-index: 2;
  }
  .close-btn {
    color: var(--light-blue);
    padding: 0.5em;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    border: none;
    outline: none;
    background: none;
    &:hover {
      color: var(--red);
    }
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

{#if $popup && $popup.length}
  {#each $popup as popup}
    <section 
      class="popup" 
      transition:fade="{{ duration: 200 }}" 
    >
      <div class="popup-content" role="dialog">
        <svelte:component 
        this={popup.component} 
        {...popup.props}
        on:close={close}
        />   
        <button class="close-btn" on:click|preventDefault={close}>
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="overlay" on:click|self={close} />
    </section>
  {/each}
{/if}

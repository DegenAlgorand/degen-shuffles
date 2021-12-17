<script>
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { wallet } from '../../stores/wallet';
  import { showWalletMenu, navBarHeight } from '../../stores/ui';
  import ConnectButton from './ConnectButton.svelte';
  import DisconnectButton from './DisconnectButton.svelte';
  import SelectAddress from './SelectAddress.svelte';
  import ShufflesList from './ShufflesList.svelte';

  function closeMenu () {
    showWalletMenu.set(false);
  }
</script>


<style lang="scss">
  @import '../../styles/variables';
  .wallet-menu {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 10;
    width: var(--wallet-menu-width);
    padding: var(--container-padding) 0 0;
    background: var(--medium-blue);
    overflow: hidden;
  }
  .wrapper {
    padding: var(--container-padding);
    height: 100%;
    overflow: auto;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: rgba($dark-blue, 0.4);
    backdrop-filter: blur(1px);
  }
</style>

{#if $showWalletMenu}
  <nav 
    class="wallet-menu"
    style={`padding-top: ${$navBarHeight}px;`}
    transition:fly|local={{x: 100, duration: 300, easing: quintOut }}
  >
    <div class="wrapper">
      {#if !$wallet.currentAddress}
        <ConnectButton />
      {:else}
        <SelectAddress />
        <ShufflesList />
  
        <DisconnectButton />
      {/if}
    </div>
  </nav>


  <div 
    class="overlay" 
    on:click|self|stopPropagation={closeMenu}
    transition:fade|local={{ duration: 300, easing: quintOut }}
  />
{/if}
<script>
  import { createEventDispatcher } from 'svelte';
  export let asaId = '...';
  
  const dispatch = createEventDispatcher();
  function close() {
    dispatch('close');
  }
</script>

<style lang="scss">
  @import '../../styles/variables';
  .wrapper {
    color: $medium-blue;
    text-align: center;
  }
  .title {
    color: $medium-blue;
    margin: 0;
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    line-height: 1.2;
    font-weight: bold;
  }
  .fas {
    margin-right: 0.5em;
  }
  p {
    margin: 1em 0;
  }
</style>

<div class="wrapper">
  <h2 class="title">
    <i class="fas fa-check-circle"></i>
    Your shuffle is minted!
  </h2>
  <p>
    Asset id : {asaId}
  </p>
  <a class="dark-btn" href="/shuffle?id={asaId}" on:click={close}>
    Go check it out
  </a>
</div>
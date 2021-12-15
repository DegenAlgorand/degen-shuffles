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
    color: var(--medium-blue);
    text-align: center;
    padding: var(--container-padding);
    background: #fff;
    border-radius: 0.5rem;
  }
  .title {
    color: var(--medium-blue);
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
    Your shuffle was minted!
  </h2>
  <p>
    Asset id : {asaId}
  </p>
  <a class="dark-btn" href="/shuffle?id={asaId}" on:click={close}>
    Go check it out
  </a>
</div>
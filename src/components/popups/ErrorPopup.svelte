<script>
  export let message = 'An error occured';
</script>

<style lang="scss">
  .wrapper {
    background: #fff;
    padding: var(--container-padding);
    border-radius: 0.5rem;
  }
  .title {
    color: var(--red);
    margin: 0;
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    line-height: 1.2;
    font-weight: bold;
  }
  .fas {
    margin-right: 0.5em;
  }
</style>

<div class="wrapper">
  <h2 class="title">
    <i class="fas fa-exclamation-triangle"></i>
    { message }
  </h2>
</div>
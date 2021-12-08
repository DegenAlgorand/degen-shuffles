<script>
  export let asaId = '...';
  export const onClose = close;

  function close(e) {
    if (e) e.preventDefault();
    console.log('close')
  }
</script>

<style lang="scss">
  @import '../../styles/variables';
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
</style>

<div class="wrapper">
  <h2 class="title">
    <i class="fas fa-check-circle"></i>
    Shuffle Asset created
  </h2>
  <p>Asset id : {asaId}</p>
  <a class="btn" href="/shuffle?id={asaId}">
    Go to your shuffle
  </a>
</div>
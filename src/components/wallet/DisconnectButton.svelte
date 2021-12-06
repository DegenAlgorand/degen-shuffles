<script>
  import signer from '../../lib/signer';
</script>


<style lang="scss">
  @import '../../styles/variables';
  button {
    width: 100%;
  }
</style>

<button class="ghost-btn" on:click={signer.disconnect}>
  Disconnect
</button>
 
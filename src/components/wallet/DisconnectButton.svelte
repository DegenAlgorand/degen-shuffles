<script>
  import algoClient from '../../lib/algoClient';
</script>


<style lang="scss">
  @import '../../styles/variables';
  button {
    width: 100%;
  }
</style>

<button class="ghost-btn" on:click={() => algoClient.disconnect() }>
  Disconnect
</button>
 
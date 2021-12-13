<script>
  import algoClient from '../../lib/algoClient';
</script>


<style lang="scss">
  @import '../../styles/variables';
  button {
    width: 100%;
  }
</style>

<button class="dark-btn" on:click={() => algoClient.disconnect() }>
  Log out
</button>
 
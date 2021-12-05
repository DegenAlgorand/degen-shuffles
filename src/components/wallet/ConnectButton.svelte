<script>
  import Signer from '../../lib/signer';
</script>


<style lang="scss">
  @import '../../styles/variables';
  .btn {
    width: 100%;
    img {
      width: 100%;
    }
  }
</style>


<h2 class="menu-title">
  Connect your wallet
</h2>

<button class="btn" on:click={Signer.connect}>
  <img src="/images/myalgo-logo.png" alt="MyAlgo Wallet">
</button>
 
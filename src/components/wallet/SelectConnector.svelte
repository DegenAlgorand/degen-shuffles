<script>
  import Signer from '../../lib/signer';
  
  async function connect(type) {
    await Signer.select(type);
    await Signer.connect();
  }
</script>


<style lang="scss">
  @import '../../styles/variables';
  .btn {
    width: 100%;
    background: $white;
    &:hover {
      background: $white;
      border-color: $white;
    }
    img {
      width: 100%;
    }
  }
</style>


<h2 class="menu-title">
  Connect your wallet
</h2>
<ul>
  <li>
    <button class="btn" on:click={() => { connect('myalgo') }}>
      <img src="/images/myalgo-logo.png" alt="MyAlgo Wallet">
    </button>
  </li>
</ul>
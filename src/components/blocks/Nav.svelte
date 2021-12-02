<script>
  import { navBarHeight } from '../../stores/ui'
  import WalletToggle from '../wallet/WalletToggle.svelte'
</script>

<style lang="scss">
  @import '../../styles/variables';
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 20;
  }
  .full-width-container {
    padding-top: 2rem;
    padding-bottom: 2rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    font-size: 1.5rem;
    font-family: $title-font;
    vertical-align: middle;
    margin: 0;
    img {
      display: inline-block;
      width: 1.5em;
      margin-right: 0.25em;
      margin-top: -0.125em;
    }
  }
  nav {
    ul, li {
      display: inline-block;
    }
  }
</style>


<header bind:clientHeight={$navBarHeight}>
  <div class="full-width-container">
    <h1 class="logo">
      <img src="/images/degen-shuffles-white.svg" alt="DEGEN Shuffles logo" />
      DEGEN Shuffles
    </h1>

    <nav>
      <ul>
        <li>
          <WalletToggle />
        </li>
      </ul>
    </nav>
  </div>
</header>
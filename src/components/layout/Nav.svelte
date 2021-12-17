<script>
  import { navBarHeight } from '../../stores/ui'
  import WalletToggle from '../wallet/WalletToggle.svelte'
</script>

<style lang="scss">
  @import '../../styles/variables';
  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 20;
  }
  .full-width-container {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background: var(--dark-blue);
  }
  .logo {
    font-size: 1.5rem;
    font-family: var(--title-font);
    vertical-align: middle;
    margin: 0;
    a {
      color: var(--white);
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    }
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
      <a href="/">
        <img src="/images/degen-shuffles-white.svg" alt="DEGEN Shuffles logo" />
        DEGEN Shuffles
      </a>
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
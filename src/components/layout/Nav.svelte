<script>
  import { navBarHeight } from '../../stores/ui'
  import WalletToggle from '../wallet/WalletToggle.svelte'
</script>

<style lang="scss">
  @import '../../styles/mixins';
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
    margin: 0;
    vertical-align: middle;
    position: relative;
    a {
      color: var(--white);
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    }
    img {
      width: 1.5em;
      margin-right: 0.25em;
      margin-top: -0.125em;
      display: none;
      @include min-width(24rem) {
        display: inline-block;
      }
    }
    .app-name {
      display: inline-block;
    }
    .tag {
      font-size: 0.5em;
      text-transform: uppercase;
      line-height: 1;
      padding: 0.25em 0.5em;
      margin-left: -3em;
      display: inline-block;
      background: var(--red) var(--gradient);
      transform: translate(0, 0.5em) rotate(-6deg);
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
        <span class="app-name">
          DEGEN Shuffles
          <span class="tag">Beta</span>
        </span>
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
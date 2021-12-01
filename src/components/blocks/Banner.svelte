<script>
  
</script>

<style lang="scss">
  @import '../../styles/variables';
  .wrapper {
    min-height: 60vh;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;

    &:before {
      content: '';
      background: radial-gradient(closest-side, rgba($red, 0.5) 0%, rgba($red,0) 100%);
      width: 100%;
      height: 200%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      animation: glow 2400ms infinite alternate ease-in-out;
    }
  }

  .container {
    position: relative;
    padding-top: 4rem;
    padding-bottom: 2rem;

    z-index: 1;
  }
  @keyframes glow {
    from {
      opacity: 0.75;
    }
    to {
      opacity: 1;
    }
  }
</style>


<header class="wrapper">
  <div class="container">
    <slot></slot>
  </div>
</header>

<script>
  
</script>

<style lang="scss">
  @import '../../styles/variables';
  .wrapper {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .container {
    position: relative;
    padding-top: 2rem;
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

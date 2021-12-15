<script>
  
</script>

<style lang="scss">
  .loading {
    width: 100%;
    height: 0.25em;
    border-radius: 0.25em;
    overflow: hidden;
    margin: 2em 0;
    position: relative;
  }
  .bar {
    height: 100%;
    width: 60%;
    position: absolute;
    top: 0;
    left: 20%;
    border-radius: 0.25em;
    background: var(--white);
    animation: bounce 800ms infinite alternate var(--ease);
  }

  @keyframes bounce {
    from {
      transform: translateX(-110%);
    }
    to {
      transform: translateX(110%);
    }
  }
</style>


<div class="loading">
  <div class="bar"></div>
</div>
<script>
  import Banner from '../components/blocks/Banner.svelte';
</script>

<style lang="scss">
  @import '../styles/variables';
  .logo-wrapper {
    text-align: center;
  }
  .logo {
    width: 33%;
    max-width: 8rem;
    margin: 0 auto 1.5em;
  }

</style>

<main>
  <Banner>
    <div class="logo-wrapper">
      <img class="logo" src="/images/degen-token-white.svg" alt="DEGEN Token Logo">
    </div>
    <h1 class="banner-title">
      DEGEN Shuffles
    </h1>
  </Banner>

  <div class="content container">
  
  </div>
</main>
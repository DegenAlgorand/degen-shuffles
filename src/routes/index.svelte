<script>
  import Banner from '../components/blocks/Banner.svelte';
</script>

<style lang="scss">
  @import '../styles/variables';
  .container {
    padding-bottom: 5rem
  }
  .cta {
    text-align: center;
    margin: 2em 0;
    padding: 2em 0;
    border-top: 1px solid $border-color; 
    border-bottom: 1px solid $border-color; 
  }
</style>


<Banner>
  <h1 class="banner-title">
    Fair shuffles for $DEGEN holders
  </h1>
</Banner>

<div class="container">
  <p>
    DEGEN Shuffles is a tool to pick random wallets of $degen holders. 
    Each shuffle is an ASA created on the Algorand blockchain. 
    These ASAs are used to store shuffle configurations 
    and keep an history of the winners over time.   
  </p>
  <p>
    The odds of a wallet getting picked depend on the amount of $degen it holds, 
    and decrease with each win. 
  </p>

  <div class="cta">
    <a class="btn" href="/create">
      Create a Shuffle
    </a>
  </div>

</div>

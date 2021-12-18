<script>
  import Banner from '../components/layout/Banner.svelte';
  import shuffles from '../lib/shuffles';
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
  .shuffles {
    margin-top: 2em;
  }
  .card {
    padding: var(--container-padding);
    border: 1px solid var(--light-blue);
    margin-bottom: 1em;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    .btn {
      font-size: 0.75em;
    }
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
    and decrease with each win if the shuffle unless it's configured otherwise. 
  </p>

  {#if false}
    <div class="cta">
      <a class="btn" href="/new">
        Create a Shuffle
      </a>
    </div>
  {/if}

  {#key $shuffles }
    {#if shuffles.all && shuffles.all.length }
      <ul class="shuffles">
        {#each shuffles.all as shuffle}
          <li class="shuffle card">
            <h3 class="card-title">{shuffle.assetName}</h3>
            <a class="btn" href="/shuffle?id={shuffle.assetId}">
              View Shuffle
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  {/key}
</div>

<script>
  import { shortenAddress } from '../../helpers/address';
  export let shuffle = {};
  const rounds = shuffle.rounds;

  
</script>

<style lang="scss">
  .card {
    padding: var(--container-padding);
    border: 1px solid var(--light-blue);
    margin-bottom: 1em;
  }
  .winner-address {
    display: block;
    word-break: break-all;
    margin-bottom: 0.5em;
    .icon {
      font-size: 0.875em;;
      color: var(--light-blue);
      margin-right: 0.5em;
    }
  }
</style>

{#if rounds && rounds.length}
  <div class="container">
    <h2 class="section-title">Winners</h2>
    <ul class="cards">
      {#each rounds as round}
        <li class="card">
          <h3 class="card-title">Round #{round.round}</h3>
          <ul class="winners">
            {#each round.winners as winner}
              <li class="winner">
                <span class="winner-address">
                  <i class="icon fas fa-trophy"></i> {winner.address}
                </span>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>
{/if}
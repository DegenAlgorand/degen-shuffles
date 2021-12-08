<script>
  import { wallet } from '../stores/wallet';
  import { loading } from '../stores/ui';
  import { shortenAddress } from '../helpers/address';
  import Shuffle from '../lib/Shuffle';
  import Banner from '../components/blocks/Banner.svelte';
  import ShuffleConfigs from '../components/forms/ShuffleConfigs.svelte';
  
  const shuffle = new Shuffle();


</script>


<style lang="scss">
 
</style>


<Banner>
  <h1 class="page-title">
    ...
  </h1>
</Banner>

<div class="container">
  <p>Shuffle description goes here</p>
</div>

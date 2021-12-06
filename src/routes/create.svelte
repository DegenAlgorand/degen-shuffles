<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { omit } from 'lodash';
  import { wallet } from '../stores/wallet';
  import { shortenAddress } from '../helpers/address';
  import Shuffle from '../lib/Shuffle';
  import Banner from '../components/blocks/Banner.svelte';
  import TextField from '../components/forms/fields/TextField.svelte';

  const shuffle = new Shuffle();
  const formData = writable({});
  setContext('form', formData);

  async function submit() {
    shuffle.validateConfigs(omit($formData, ['errors']));
    formData.set({ ...shuffle.configs, errors: shuffle.errors })
    
    if (shuffle.hasError) return;
    await shuffle.create();
  }
</script>


<style lang="scss">
  form {
    margin: 2em 0;
  }
  .actions {
    margin-top: 1.5em;
  }
</style>


<Banner>
  <h1 class="page-title">
    New Shuffle
  </h1>
</Banner>


{#if $wallet.currentAddress }
  <div class="container">
    <p>
      Creating a shuffle will add an ASA to your wallet ({ shortenAddress($wallet.currentAddress) }). 
      This asset will be used to store the shuffle configs and its winners history. 
    </p>

    <form on:submit|preventDefault={submit}>
      <TextField
        label="Shuffle name"
        name="name"
      />
      <div class="actions">
        <button type="submit" class="btn">
          Submit
        </button>
      </div>
    </form>
  </div>
  

{:else}
  <div class="container">
    <p>You must connect your wallet to create a shuffle.</p>
  </div>
{/if}
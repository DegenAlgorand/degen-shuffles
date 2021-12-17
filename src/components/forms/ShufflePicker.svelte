<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { loading } from '../../stores/ui';
  import popup from '../../lib/popup';
  import Shuffle from '../../lib/Shuffle';
  import TextField from './fields/TextField.svelte';
  export let shuffle = new Shuffle();

  const formData = writable(shuffle.configs);
  setContext('form', formData);

  async function submit(e) {
    e.preventDefault();
    loading.set(true);
    
    console.log($formData);

    loading.set(false);
  }
</script>


<style lang="scss">
  @import '../../styles/variables';
  form {
    padding: var(--container-padding);
    background: var(--dark-blue);
    border: 2px solid;
    border-image-slice: 1;
    border-image-source: var(--gradient);
    :global(.field) {
      margin-bottom: 1.5em;
    }
  }
</style>


<form on:submit={submit}>


  <TextField
    label="How many winners to pick?"
    name="qty"
    rows="4"
  />

  <div class="actions">
    <button type="submit" class="btn">
      Pick me some lucky degens 
    </button>
  </div>
</form>
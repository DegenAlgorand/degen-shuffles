<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { loading } from '../../stores/ui';
  import popup from '../../lib/popup';
  import Shuffle from '../../lib/Shuffle';
  import NumberField from '../forms/fields/NumberField.svelte';
  import Error from '../popups/ErrorPopup.svelte';
  export let shuffle = new Shuffle();

  const formData = writable({});
  setContext('form', formData);

  async function submit(e) {
    e.preventDefault();
    loading.set(true);

    const qty = Number($formData.qty); 
    if (!qty) {
      popup.open(Error, {
        message: 'You need at least one winner...'
      });
      loading.set(false);
      return
    }

    const winnersTxn = await shuffle.pick(qty);
    console.log(winnersTxn);
    if (winnersTxn) {
      popup.close();
    }
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


  <NumberField
    label="How many winners do you want?"
    name="qty"
    min="1"
    max="16"
    defaultValue="1"
  />

  <div class="actions">
    <button type="submit" class="btn">
      Pick me some lucky degenerates
    </button>
  </div>
</form>
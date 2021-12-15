<script>
  import { setContext, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { omit } from 'lodash';
  import { loading } from '../../stores/ui';
  import popup from '../../lib/popup';
  import Shuffle from '../../lib/Shuffle';
  import TextField from './fields/TextField.svelte';
  import TextareaField from './fields/TextareaField.svelte';
  import AssetCreated from '../popups/AssetCreated.svelte';
  export let shuffle = new Shuffle();
  export let mode = 'edit';

  const formData = writable(shuffle.configs);
  setContext('form', formData);

  async function submit(e) {
    e.preventDefault();
    loading.set(true);
    console.log($formData)
    shuffle.validateConfigs(omit($formData, ['errors']));
    formData.set({ ...shuffle.configs, errors: shuffle.errors }) 
    if (shuffle.hasErrors) { 
      loading.set(false);
      return;
    }

    // Create mode
    if (mode === 'create') {
      const txn = await shuffle.create();
      await tick();
      if (txn['asset-index']) {
        popup.open(AssetCreated, {
          asaId: txn['asset-index'],
        });
      }
    }

    // Edit mode
    if (mode === 'edit') {
      const txn = await shuffle.update();
      popup.close();
    }

    loading.set(false);
  }
</script>

<style lang="scss">
  @import '../../styles/variables';
  form {
    margin: 2em 0;
    border-radius: 1rem;
    padding: var(--container-padding);
    background: var(--medium-blue);
    box-shadow: 0 0 3rem -2rem rgba($red, 0.2),
                0 0 10rem -2rem rgba($red, 0.6);
    :global(.field) {
      margin-bottom: 1.5em;
    }
  }
</style>


<form on:submit={submit}>
  {#if mode === 'create'}
    <TextField
      label="Shuffle Name"
      info="This is the ASA name. It cannot be modified later. 32 characters max."
      name="assetName"
    />
  {/if}

  <TextareaField
    label="Description"
    info="Tell us about the shuffle. 300 characters max."
    name="description"
    rows="4"
  />
  
  <div class="actions">
    <button type="submit" class="btn">
      Submit
    </button>
  </div>
</form>
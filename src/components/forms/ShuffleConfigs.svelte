<script>
  import { setContext, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { omit } from 'lodash';
  import { loading } from '../../stores/ui';
  import popup from '../../lib/popup';
  import Shuffle from '../../lib/Shuffle';
  import TextField from './fields/TextField.svelte';
  import TextareaField from './fields/TextareaField.svelte';
  import Toggle from './fields/Toggle.svelte';
  import AssetCreated from '../popups/AssetCreated.svelte';
  export let shuffle = new Shuffle();
  export let mode = 'edit';

  const formData = writable(shuffle.configs);
  setContext('form', formData);

  async function submit(e) {
    e.preventDefault();
    loading.set(true);
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
  {#if mode === 'create'}
    <TextField
      label="Shuffle Name"
      info="This is the ASA name. It cannot be modified later. 32 characters max."
      name="assetName"
    />
  {/if}

  <div class="columns">
    <TextField
      label="Project URL"
      name="url"
    />
    <TextField
      label="Twitter handle"
      name="twitter"
    />
  </div>

  <TextareaField
    label="Description"
    info="Tell us about the shuffle. 300 characters max."
    name="description"
    rows="4"
  />

  <Toggle
    label="Require Opt-In"
    info="Users must opt-in to participate."
    name="requireOptin"
  />

  <Toggle
    label="Decrease previous winners odds"
    info="The odds of a wallet to be picked decrease after each win."
    name="decreasePrevious"
  />

  <div class="actions">
    <button type="submit" class="btn">
      Submit
    </button>
  </div>
</form>
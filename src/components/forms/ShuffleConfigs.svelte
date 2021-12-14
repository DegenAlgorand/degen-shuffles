<script>
  import TextField from './fields/TextField.svelte';
  import TextareaField from './fields/TextareaField.svelte';
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


<form on:submit>
  <TextField
    label="Shuffle Name"
    info="Cannot be modified later. 32 characters max."
    name="assetName"
  />

  <TextareaField
    label="Description"
    info="Tell us about the shuffle. 200 characters max."
    name="description"
    rows="4"
  />
  
  <div class="actions">
    <button type="submit" class="btn">
      Submit
    </button>
  </div>
</form>
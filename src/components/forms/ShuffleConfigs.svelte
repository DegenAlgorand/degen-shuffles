<script>
  import TextField from './fields/TextField.svelte';
</script>

<style lang="scss">
  @import '../../styles/variables';
  form {
    margin: 2em 0;
    border-radius: 1rem;
    padding: var(--container-padding);
    background: $medium-blue;
    box-shadow: 0 0 3rem -2rem rgba($red, 0.2),
                0 0 10rem -2rem rgba($red, 0.6);
    :global(.field) {
      margin-bottom: 1.5em;
    }
  }
</style>


<form on:submit>
  <TextField
    label="Shuffle Asset name"
    info="Cannot be modified later. 32 characters max."
    name="assetName"
  />

  <TextField
    label="Display name"
    info="Can be edited later if needed. 64 characters max."
    name="displayName"
  />
  
  <div class="actions">
    <button type="submit" class="btn">
      Submit
    </button>
  </div>
</form>
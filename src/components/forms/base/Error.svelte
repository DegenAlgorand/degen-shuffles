<script>
  import { getContext, onMount } from 'svelte';
  import { getError, getErrorMessage } from '../../../helpers/errors';
  export let name;
  export let code;
  let hasError = false;
  let message;
  const store = getContext('form');
  
  onMount(checkForError);
  $: $store, checkForError();
  
  function checkForError() {
    message = name ? getError(name, store) : getErrorMessage(code),
    hasError = !!message;
  }
</script>

<style lang="scss">
  @import '../../../styles/variables';
  .error-message {
    color: var(--red);
    margin-top: 0.5em;
  }
</style>


{#if hasError}
  <div class="message error-message">
    {message}
  </div>
{/if}
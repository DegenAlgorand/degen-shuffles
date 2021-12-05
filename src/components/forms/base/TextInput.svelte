<script>
  import { onMount, getContext } from 'svelte';
  import { get, set } from 'lodash';
  import { getError, removeError } from '../../../helpers/errors';
  export let name;
  export let value;
  export let defaultValue = undefined;

  const store = getContext('form');
  $: value, update();

  onMount(() => {
    if (typeof value === 'undefined') get($store, name);
    if (typeof value === 'undefined') defaultValue;
  })

  function update() {
    store.update(data => set(data, name, value))
    if (getError(name, store)) {
      removeError(name, store);
    }
  }

</script>

<input
  id={name}
  name={name}
  type="text" 
  class="input text-input" 
  bind:value
  {...$$restProps}
/>
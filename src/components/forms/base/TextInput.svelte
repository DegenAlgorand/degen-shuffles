<script>
  import { onMount, getContext } from 'svelte';
  import { get, set } from 'lodash';
  import { getError, removeError } from '../../../helpers/errors';
  import { stripTags } from '../../../helpers/strings';
  export let name;
  export let value;
  export let defaultValue = undefined;
  let mounted = false;
  const store = getContext('form');
  $: value, update();

  onMount(() => {
    if (value === undefined) value = get($store, name);
    if (value === undefined) value = defaultValue;
    mounted = true;
  })

  function update() {
    if (!mounted) return;
    store.update(data => set(data, name, value))
    if (getError(name, store)) {
      removeError(name, store);
    }
  }
  function clean() {
    value = stripTags(value);
    update();
  }

</script>

<input
  id={name}
  name={name}
  type="text" 
  class="input text-input" 
  bind:value
  on:blur={clean}
  {...$$restProps}
/>
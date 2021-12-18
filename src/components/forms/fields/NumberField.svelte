<script>
  import Field from '../base/Field.svelte';
  import TextInput from '../base/TextInput.svelte';
</script>


<Field 
  component={TextInput}
  type="number"
  {...$$restProps}
>
  <slot></slot>
</Field>
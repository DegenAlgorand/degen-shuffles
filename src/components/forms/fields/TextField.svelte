<script>
  import Field from '../base/Field.svelte';
  import TextInput from '../base/TextInput.svelte';
</script>


<Field 
  component={TextInput}
  {...$$restProps}
>
  <slot></slot>
</Field>
<script>
  import Field from '../base/Field.svelte';
  import Checkbox from '../base/Checkbox.svelte';
</script>


<Field 
  component={Checkbox}
  fieldClass="toggle"
  {...$$restProps}
>
  <slot></slot>
</Field>
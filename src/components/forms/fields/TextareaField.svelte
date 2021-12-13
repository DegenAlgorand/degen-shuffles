<script>
  import Field from '../base/Field.svelte';
  import Textarea from '../base/Textarea.svelte';
</script>


<Field 
  component={Textarea}
  {...$$restProps}
>
  <slot></slot>
</Field>
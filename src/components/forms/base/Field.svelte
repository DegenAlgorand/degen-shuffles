<script>
  import Label from './Label.svelte';
  import Error from './Error.svelte';
  export let component;
  export let name;
  export let label;
  export let info;
  export let value;
  export let fieldClass;
</script>



<div class="field {fieldClass}">
  {#if label || info}
    <Label {label} {info} {name} />
  {/if}

  <svelte:component 
    this={component}
    {name}
    bind:value
    {...$$restProps} 
  />
  
  <Error {name} />

  <slot></slot>
</div>
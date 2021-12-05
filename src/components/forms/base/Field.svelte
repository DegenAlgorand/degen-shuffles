<script>
  import Label from './Label.svelte';
  import Error from './Error.svelte';
  export let component;
  export let name;
  export let label;
  export let value;
</script>



<div class="field">
  {#if label}
    <Label {label} {name} />
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
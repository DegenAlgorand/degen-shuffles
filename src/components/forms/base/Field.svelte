<script>
  import Label from './Label.svelte';
  import Error from './Error.svelte';
  export let component;
  export let name;
  export let label;
  export let info;
  export let value;
</script>



<div class="field">
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
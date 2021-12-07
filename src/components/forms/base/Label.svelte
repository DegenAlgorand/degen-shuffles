<script>
  export let name;
  export let label;
  export let info;
</script>

<style lang="scss">
  .label {
    display: block;
    text-transform: uppercase;
  }
  .info {
    display: block;
    text-transform: none;
    font-style: italic;
    font-size: 0.875em;
  }
</style>

<label for={name} class="label">
  {#if label}
    {label}
  {/if}
  {#if info}
    <span class="info">
      {info}
    </span>
  {/if}
</label>
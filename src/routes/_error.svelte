<script>
	import Banner from '../components/layout/Banner.svelte';
	export let status;
	export let error = {};
	const dev = process.env.NODE_ENV === 'development';
</script>

<style lang="scss">
	
</style>


<svelte:head>
	<title>{status}</title>
</svelte:head>

<Banner>
  <h1 class="page-title">
    {status}
  </h1>
</Banner>

<div class="container">
	{#if error.message}
		<p>{error.message}</p>
	{/if}
	
	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>

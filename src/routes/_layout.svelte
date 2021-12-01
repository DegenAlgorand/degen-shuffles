<script>
	import Nav from '../components/blocks/Nav.svelte';
</script>

<style lang="scss" global>
	@import "../styles/global";
	main {
		background: linear-gradient($medium-blue 0%, $dark-blue 60vh);
	}
</style>

<svelte:head>
	<title>DEGEN Shuffles</title>
</svelte:head>


<Nav />

<main>
	<slot></slot>
</main>


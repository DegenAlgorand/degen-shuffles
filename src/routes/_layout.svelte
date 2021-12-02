<script>
	import { navBarHeight } from '../stores/ui';
	import Nav from '../components/blocks/Nav.svelte';
	import WalletMenu from '../components/wallet/WalletMenu.svelte';
</script>

<style lang="scss" global>
	@import "../styles/global";
	.app-wrapper { 
		background: linear-gradient($medium-blue 0%, $dark-blue 60vh);
	}
</style>

<svelte:head>
	<title>DEGEN Shuffles</title>
</svelte:head>

<Nav />
<WalletMenu />

<main 
	class="app-wrapper" 
	style={`padding-top: ${$navBarHeight}px;`}
>
	<slot></slot>
</main>



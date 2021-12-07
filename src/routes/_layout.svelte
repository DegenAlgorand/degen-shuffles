<script>
	import { navBarHeight } from '../stores/ui';
	import Nav from '../components/blocks/Nav.svelte';
	import WalletMenu from '../components/wallet/WalletMenu.svelte';
	import Scripts from '../components/wallet/Scripts.svelte';
</script>

<style lang="scss" global>
	@import "../styles/global";
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

<Scripts />



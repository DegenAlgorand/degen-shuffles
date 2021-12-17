<script>
	import { onMount } from 'svelte';
	import { navBarHeight } from '../stores/ui';
	import Nav from '../components/layout/Nav.svelte';
	import WalletMenu from '../components/wallet/WalletMenu.svelte';
	import Scripts from '../components/elements/Scripts.svelte';
	import Popup from '../components/popups/Popup.svelte';
	import Loading from '../components/elements/LoadingFullscreen.svelte';
</script>

<style lang="scss" global>
	@import "../styles/global";
	.app-wrapper {
		padding-bottom: 4rem;
	}
</style>

<svelte:head>
	<title>DEGEN Shuffles</title>
</svelte:head>

<Nav />
<WalletMenu />

<main 
	class="app-wrapper" 
	style={`padding-top: ${$navBarHeight + 48}px;`}
>
	<slot></slot>
</main>

<Popup />
<Loading />
<Scripts />



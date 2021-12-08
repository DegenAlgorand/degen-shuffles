<script>
	import { navBarHeight } from '../stores/ui';
	import Nav from '../components/blocks/Nav.svelte';
	import WalletMenu from '../components/wallet/WalletMenu.svelte';
	import Scripts from '../components/wallet/Scripts.svelte';
	import Popup from '../components/popups/Popup.svelte';
	import LoadingAnim from '../components/elements/LoadingAnim.svelte';
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
	style={`padding-top: ${$navBarHeight}px;`}
>
	<slot></slot>
</main>

<Popup />
<LoadingAnim />
<Scripts />



<script>
  import { onMount } from 'svelte';
  import algoClient from '../../lib/algoClient';
  let algosdkScript;
  let myalgoScript;
  let algosdkLoaded = false;
  let myalgoLoaded = false;

  onMount(() => {
    // AlgoSDK
    if (window.algosdk) loaded('algosdk');
    else algosdkScript.addEventListener('load', () => { loaded('algosdk') });
    // MyAlgoConnect
    if (window.MyAlgoConnect) loaded('myalgo');
    else myalgoScript.addEventListener('load', () => { loaded('myalgo') });
  });

  function loaded (scriptLoaded) {
    if (scriptLoaded === 'algosdk') algosdkLoaded = true;
    if (scriptLoaded === 'myalgo') myalgoLoaded = true;
    if (algosdkLoaded && myalgoLoaded) {
      algoClient.init();
    }
  }
</script>

<svelte:head>
  <script bind:this={algosdkScript} src="/scripts/algosdk.1.13.0-beta.2.min.js" async></script>
	<script bind:this={myalgoScript} src="/scripts/myalgo.min.js" async></script>
</svelte:head>
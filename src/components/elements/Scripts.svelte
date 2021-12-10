<script>
  import { onMount } from 'svelte';
  import algoClient from '../../lib/algoClient';
  let algosdkScript;
  let myalgoScript;
  let msgpackScript;
  let algosdkLoaded = false;
  let myalgoLoaded = false;
  let msgpackLoaded = false;

  onMount(() => {
    // AlgoSDK
    if (window.algosdk) loaded('algosdk');
    else algosdkScript.addEventListener('load', () => { loaded('algosdk') });
    // MyAlgoConnect
    if (window.MyAlgoConnect) loaded('myalgo');
    else myalgoScript.addEventListener('load', () => { loaded('myalgo') });
    // MsgPack
    if (window.msgpack) loaded('msgpack');
    else msgpackScript.addEventListener('load', () => { loaded('msgpack') });
  });

  function loaded (scriptLoaded) {
    if (scriptLoaded === 'algosdk') algosdkLoaded = true;
    if (scriptLoaded === 'myalgo') myalgoLoaded = true;
    if (scriptLoaded === 'msgpack') msgpackLoaded = true;
    if (algosdkLoaded && myalgoLoaded && msgpackLoaded) {
      algoClient.init();
    }
  }
</script>

<svelte:head>
  <script bind:this={algosdkScript} src="/scripts/algosdk.min.js" async></script>
	<script bind:this={myalgoScript} src="/scripts/myalgo.min.js" async></script>
	<script bind:this={msgpackScript} src="/scripts/msgpack.min.js" async></script>
</svelte:head>
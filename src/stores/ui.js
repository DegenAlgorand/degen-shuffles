import { writable } from 'svelte/store';


//
// Keep track of nav bar height
// ----------------------------------------------
export const navBarHeight = writable(0);

//
//  Display state of the wallet panel
// -------------------------------------------
export const showWalletMenu = writable(false);

//
// App Loading state 
// ----------------------------------------------
export const loading = writable(false);

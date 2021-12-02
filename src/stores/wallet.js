import { writable } from 'svelte/store';
import { persist, localStorage } from "@macfja/svelte-persistent-store";

export const wallet = persist(writable({}), localStorage(), 'wallet');
import { writable } from 'svelte/store';

export const chatMessages = writable(["Message 1", "Message 2"]);
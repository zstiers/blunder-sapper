<script>
    import { chatMessages } from 'store.ts';
</script>

<style>
    .feed {
        flex: 1;
        display: flex;
        flex-direction: column-reverse;
        overflow: auto;
        background-color: palegreen;
    }
</style>

<div class="feed">
	{#each $chatMessages as message}
        <h1>{message}</h1>
	{/each}
</div>
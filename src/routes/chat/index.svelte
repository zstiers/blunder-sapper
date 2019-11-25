<script lang="typescript" context="module">
    import Feed from './_feed.svelte';
    import { chatMessages } from 'store.ts';
    
    const ws = typeof(window) !== 'undefined' && (function() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(`${protocol}//${window.location.host}`);
        ws.onmessage = event => chatMessages.update(cm => [event.data, ...cm]);
        return ws;
    })();
</script>

<script lang="typescript">
    let textInput = '';

    function addMsg() {
        ws.send(textInput);
        textInput = '';
    }
</script>

<style>
    .root {
        background-color: pink;
        height: 100%;
        flex: auto;
        display: flex;
        flex-direction: row;
    }
    .room-nav {
        background-color: purple;
        height: 100%;
        width: 80px;
    }
    .room {
        background-color: grey;
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .input {
        background-color: skyblue;
        width: 100%;
        height: 150px;
    }
</style>

<svelte:head>
	<title>Chatty</title>
</svelte:head>

<div class="root">
    <div class="room-nav"/>
    <div class="room">
        <Feed/>
        <div class="input">
            <input bind:value={textInput}>
            <button on:click={addMsg}>Add Message</button>
        </div>
    </div>
</div>

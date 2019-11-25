<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
    .root {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: pink;
        display: flex;
        flex-direction: column;
    }
</style>

<div class="root">
    <Nav {segment}/>
    <slot/>
</div>
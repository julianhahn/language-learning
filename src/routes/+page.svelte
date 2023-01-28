<script lang="ts">
	let countObject: {x:number, y:number} = {x: 0, y:0} 

	function onCount(){
		countObject.x = countObject.x +1
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	<button on:click={onCount}>plus 1</button>
	<p>{countObject.x}</p>
</div>

<style>
</style>

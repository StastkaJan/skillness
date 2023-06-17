<script>
	import { page } from '$app/stores'
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy, onMount } from 'svelte'

	onMount(() => {
		$headerBg = false
	})

	onDestroy(() => {
		$headerBg = true
	})
</script>

<svelte:head>
	<title>Došlo k chybě | Skillnes</title>
</svelte:head>

<main>
	{#if $page.status == 404}
		<h1>Nenalezeno</h1>
		<p>{$page.error.message || ''}</p>
	{:else}
		<h1>Chyba</h1>
		<p>{$page.error.message || ''}</p>
	{/if}
</main>

<style>
	main {
		margin: 100px 20px;
	}
</style>

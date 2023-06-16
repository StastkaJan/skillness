<script>
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})
</script>

<svelte:head>
	<title>Často kladené otázky | Skillnes</title>
	<meta
		name="description"
		content="Máš otázku ohledně webového portálu Skillnes? Je velká šance, že tady najdeš odpověď a ani se nemusíš nikoho ptát!"
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Společnost" />
</svelte:head>

<div>
	<h1>Často kladené otázky</h1>
	<p>Seznam nejčastějších otázek a odpovědí. Najdi odpověď dřív než se zeptáš!</p>
	<details>
		<summary>asfasf</summary>
		asdasdas
	</details>
</div>

<style>
	div {
		max-width: 800px;
		margin: 100px auto;
		padding: 10px;
	}
</style>

<script>
	import { page } from '$app/stores'
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy, onMount } from 'svelte'
	import TeacherTile from './teacherTile.svelte'

	let teachers = [],
		search = ''

	$: teachers = $page.data.teachers

	onMount(() => {
		$headerBg = true
	})

	onDestroy(() => {
		$headerBg = false
	})
</script>

<svelte:head>
	<title>Přehled doučujících | Skillnes</title>
	<meta
		name="description"
		content="Přehled všech doučujících. Najdi parťáka, který ti pomůže a přihlaš se k na hodinu."
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Doučující, Učitelé" />
</svelte:head>

<main>
	<section>
		<div>
			<h1>Přehled doučujících<span>Najdi parťáka, který ti pomůže</span></h1>

			<form action="">
				<input type="search" placeholder="Amanda Melounová" bind:value={search} />
			</form>
		</div>
	</section>
	<section class="tiles">
		<div>
			{#each teachers as { name, bio, img, site, price, score }}
				<TeacherTile {name} {bio} {img} {site} {price} {score} />
			{:else}
				<p>Nikdo nenalezen</p>
			{/each}
		</div>
	</section>
</main>

<style>
	section:first-of-type {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: linear-gradient(120deg, #5f1f69 5%, #341de1 65%, #00d5ff 110%);
	}
	section:first-of-type > div {
		max-width: 400px;
	}
	h1,
	span {
		color: #fff;
	}
	h1 span {
		display: block;
		font-size: 0.5em;
	}
	input {
		padding: 0.7em;
	}
	section.tiles > div {
		display: flex;
		flex-wrap: wrap;
		gap: 50px;
		max-width: 1100px;
	}
</style>

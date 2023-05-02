<script>
	import { onDestroy, onMount } from 'svelte'
	import { headerBg } from '$store/clientStore.js'

	export let data = {}

	onMount(() => {
		$headerBg = true
	})

	onDestroy(() => {
		$headerBg = false
	})

	let search = ''
</script>

<svelte:head>
	<title>Přehled předmětů | Skillnes</title>
</svelte:head>

<main>
	<section>
		<div>
			<h1>Přehled předmětů<span>Najdi předmět, který ti moc nejde</span></h1>

			<input type="search" placeholder="Matematika" bind:value={search} />
		</div>
	</section>

	<div class="subjects">
		{#each data?.subjects as subject}
			{#if search.length <= 0 || subject.name
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.match(search
							.toLowerCase()
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')) || subject.description
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.match(search
							.toLowerCase()
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, ''))}
				<a href="/teachers?sbjid={subject.id}">
					<h3>{subject.name}</h3>
					<p>{subject.description}</p>
				</a>
			{/if}
		{:else}
			<p>Nic nenalezeno</p>
		{/each}
	</div>
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
	.subjects {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 50px;
		max-width: 1170px;
		margin: 80px auto;
		padding: 0 10px;
	}
	.subjects > a {
		width: 350px;
		padding: 20px;
		box-shadow: 0 0 10px #ccc;
		border-radius: 20px;
	}
</style>

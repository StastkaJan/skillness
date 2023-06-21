<script>
	import ReviewPop from './reviewPop.svelte'
	import { page } from '$app/stores'
	import { popup } from '$store/clientStore.js'

	export let { lessons } = $page.data

	$: lessons = $page.data?.lessons

	function openReview(id) {
		$popup = {
			title: 'Napiš hodnocení',
			component: ReviewPop,
			props: { id }
		}
	}
</script>

<svelte:head>
	<title>Přihlášení k hodinám | Profil | Skillnes</title>
</svelte:head>

<div class="container">
	<div>
		<h1>Přihlášení k hodinám</h1>
		<p>
			Tady najdeš seznam, ke kterým hodinám jsi přihlášen(a). U jednotlivých hodin je název
			doučujícího s odkazem na jeho stránku, čas konání a stav. Po absolvování hodiny se ti otevře
			možnost hodnocení, případně si můžeš stěžovat skrz kontaktní formulář.
		</p>
	</div>
	<div class="tiles">
		{#each lessons as { id, start, teacher, subject, status, site }}
			<div class="tile">
				<h3>{subject}</h3>
				<small>
					{new Date(start).toLocaleString('cs-CZ', {
						weekday: 'short',
						month: '2-digit',
						day: '2-digit',
						hour: '2-digit',
						minute: '2-digit'
					})}
				</small>
				<p>Doučující: <a href="/doucujici/{site}">{teacher}</a></p>
				{#if status === 'W'}
					<p>Hodina zatím nebyla přijata</p>
				{:else if status === 'F'}
					<p>Hodina byla odmítnuta</p>
				{:else}
					<p>Hodina je přijatá</p>
				{/if}
				{#if status === 'T' && new Date(start) < new Date()}
					<div class="buttons">
						<button
							class="button"
							on:click={() => {
								openReview(id)
							}}>Ohodnotit</button
						>
						<a href="/informace/kontakt">Nahlásit</a>
					</div>
				{/if}
			</div>
		{:else}
			<p>Žádné hodiny k zobrazení</p>
		{/each}
	</div>
</div>

<style>
	div.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 50px;
		flex-direction: column;
		width: 100%;
		max-width: 750px;
		margin-bottom: 50px;
	}
	div.container > div:first-of-type {
		text-align: center;
	}
	div.tiles {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: 50px 30px;
	}
	div.tile {
		width: 320px;
		min-height: 120px;
		padding: 20px;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 0 10px #ccc;
	}
	div.buttons {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	button.button {
		display: inline-block;
		height: 40px;
		margin: 5px 0;
		color: #fff;
		font-weight: bold;
		background: #000;
		border: none;
		border-radius: 5px;
		outline: none;
	}
</style>

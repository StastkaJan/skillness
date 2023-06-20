<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { notification, loading } from '$store/clientStore.js'

	export let { lessons } = $page.data

	$: lessons = $page.data?.lessons

	function handleResult(result) {
		$loading = false
		$notification = {
			text: result.text,
			type: result.result
		}
		invalidateAll()
	}
</script>

<svelte:head>
	<title>Doučované hodiny | Profil | Skillnes</title>
</svelte:head>

<div class="container">
	<div>
		<h1>Doučované hodiny</h1>
		<p>
			Tady najdeš seznam přihlášek k předmětu. Pokaždé, když ti některá dorazí, obdržíš informační
			email. Následně stačí na této stránce hodinu potvrdit.
		</p>
	</div>
	<div class="tiles">
		{#each lessons as { id, start, student, subject, status }}
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
				<p>Doučovaná/ý: {student}</p>
				{#if status === 'W'}
					<div class="buttons">
						<form
							action="?/confirmLesson"
							method="POST"
							use:enhance={() => {
								$loading = true
								return async ({ result }) => {
									handleResult(result.data)
								}
							}}
						>
							<input type="hidden" name="lesson" value={id} />
							<button class="button">Přijmout</button>
						</form>
						<form
							action="?/denyLesson"
							method="POST"
							use:enhance={() => {
								$loading = true
								return async ({ result }) => {
									handleResult(result.data)
								}
							}}
						>
							<input type="hidden" name="lesson" value={id} />
							<button class="button">Odmítnout</button>
						</form>
					</div>
				{:else}
					<p>Hodina je přijatá</p>
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
	}
	button.button {
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

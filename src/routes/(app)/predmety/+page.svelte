<script>
	import { enhance } from '$app/forms'
	import { onDestroy, onMount } from 'svelte'
	import { notification, loading, headerBg } from '$store/clientStore.js'

	export let data = {}

	let selectedUni = data?.uni || '',
		selectedFaculty = data?.faculty || ''

	onMount(() => {
		$headerBg = true
	})

	onDestroy(() => {
		$headerBg = false
	})

	function handleResult(result) {
		$loading = false
		if (result.result === 'error') {
			$notification = {
				text: result.text,
				type: result.result
			}
		} else if (result.result === 'success') {
			data.subjects = data.subjects.concat(result.data)
			data.offset = result.offset
		}
	}
</script>

<svelte:head>
	<title>Přehled předmětů | Skillnes</title>
	<meta
		name="description"
		content="Přehled všech předmětů. Najdi předmět, který ti moc nejde. Následně se prokliknutím dostaneš na stránku doučujících a už jsi jen jeden krok od lepších studijních výsledků."
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Předměty" />
</svelte:head>

<main>
	<section>
		<div>
			<h1>Přehled předmětů<span>Najdi předmět, který ti moc nejde</span></h1>

			<form action="" method="GET">
				<input type="search" name="search" placeholder="Matematika" value={data?.search} />
				<input type="hidden" name="faculty" value={selectedFaculty} />
				<input type="hidden" name="uni" value={selectedUni} />
			</form>
		</div>
	</section>

	<form class="filter" action="" method="GET">
		<input type="hidden" name="search" value={data?.search} />
		<div>
			<label for="uni">Univerzita</label>
			<select name="uni" id="uni" on:change={e => (selectedUni = e.target.value)}>
				<option value="" label="Zvolit univerzitu" />
				{#each data?.unis as uni}
					<option value={uni.id} label={uni.name} selected={uni.id == selectedUni} />
				{/each}
			</select>
		</div>
		<div>
			<label for="faculty">Fakulta</label>
			<select name="faculty" id="faculty" on:change={e => (selectedFaculty = e.target.value)}>
				<option value="" label="Zvolit fakultu" />
				{#each data?.faculties as faculty}
					{#if faculty.uniid == selectedUni || selectedUni == ''}
						<option
							value={faculty.id}
							label={faculty.name}
							selected={faculty.id == data?.faculty}
						/>
					{/if}
				{/each}
			</select>
		</div>
		<button>Použít</button>
	</form>

	<div class="subjects">
		{#each data?.subjects as subject}
			<a href="/doucujici?subject={subject.id}">
				<h3>{subject.name}</h3>
				<p>{subject.description}</p>
			</a>
		{:else}
			<p class="notfound">Nic nenalezeno</p>
		{/each}
	</div>

	{#if data.subjects[0]?.rows > 20 * (data.offset + 1)}
		<form
			action="?/loadMore"
			method="POST"
			use:enhance={() => {
				$loading = true
				return async ({ result }) => {
					handleResult(result.data)
				}
			}}
		>
			<input type="hidden" name="search" value={data?.search} />
			<input type="hidden" name="offset" value={data.offset + 1} />
			<input type="hidden" name="faculty" value={data?.faculty} />
			<input type="hidden" name="uni" value={data?.uni} />
			<button class="button">Zobrazit další</button>
		</form>
	{/if}
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
	form.filter {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin: 20px auto;
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
		border-radius: 10px;
		transition: 0.2s;
	}
	.subjects > a:hover {
		box-shadow: inset 0 0 10px #ccc;
	}
	.notfound {
		margin: 50px;
		font-size: 2em;
	}
	form > div {
		width: 150px;
	}
	form {
		width: fit-content;
		margin: auto;
	}
	button {
		height: 40px;
		color: #fff;
		font-weight: bold;
		background: #000;
		border: none;
		border-radius: 5px;
		outline: none;
	}
	@media (max-width: 800px) {
		form.filter {
			flex-direction: column;
		}
	}
</style>

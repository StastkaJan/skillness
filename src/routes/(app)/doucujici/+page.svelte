<script>
	import { notification, loading, headerBg } from '$store/clientStore.js'
	import { onDestroy, onMount } from 'svelte'
	import TeacherTile from './teacherTile.svelte'
	import { enhance } from '$app/forms'

	export let data

	let selectedUni = data?.uni || '',
		selectedFaculty = data?.faculty || '',
		selectedSubject = data?.subject || '',
		price = data?.price || 1000

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
			data.teachers = data.teachers.concat(result.data)
			data.offset = result.offset
		}
	}
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

			<form action="" method="GET">
				<input type="search" name="search" placeholder="Amanda Melounová" value={data?.search} />
				<input type="hidden" name="faculty" value={selectedFaculty} />
				<input type="hidden" name="uni" value={selectedUni} />
				<input type="hidden" name="subject" value={selectedSubject} />
				<input type="hidden" name="price" value={price} />
			</form>
		</div>
	</section>

	<form class="filter" action="" method="GET">
		<input type="hidden" name="search" value={data?.search} />
		<input type="hidden" name="search" placeholder="Matematika" value={data?.search} />
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
		<div>
			<label for="subject">Předmět</label>
			<select name="subject" id="subject" on:change={e => (selectedSubject = e.target.value)}>
				<option value="" label="Zvolit předmět" />
				{#each data?.subjects as subject}
					{#if (subject.facultyid == selectedFaculty || selectedFaculty == '') && (subject.uni == selectedUni || selectedUni == '')}
						<option
							value={subject.id}
							label="{subject.name} - {subject.ident}"
							selected={subject.id == data?.subject}
						/>
					{/if}
				{/each}
			</select>
		</div>
		<div>
			<label for="price"
				>Cena (max {new Intl.NumberFormat('cs-CZ', {
					style: 'currency',
					currency: 'CZK',
					maximumFractionDigits: 0
				}).format(price)})</label
			>
			<input
				type="range"
				name="price"
				min="50"
				max="1000"
				title={new Intl.NumberFormat('cs-CZ', {
					style: 'currency',
					currency: 'CZK',
					maximumFractionDigits: 0
				}).format(price)}
				bind:value={price}
			/>
		</div>
		<button>Použít</button>
	</form>

	<section class="tiles">
		<div>
			{#each data?.teachers as { name, bio, img, site, price, score }}
				<TeacherTile {name} {bio} {img} {site} {price} {score} />
			{:else}
				<p class="notfound">Nikdo nenalezen</p>
			{/each}
		</div>
	</section>

	{#if data.teachers[0]?.rows > 20 * (data.offset + 1)}
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
			<input type="hidden" name="subject" value={data?.subject} />
			<input type="hidden" name="price" value={price} />
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
	section.tiles > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 80px;
	}
	form.filter {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin: 20px auto;
	}
	form > div {
		width: 150px;
	}
	.notfound {
		margin: 50px;
		font-size: 2em;
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

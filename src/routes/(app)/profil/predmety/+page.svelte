<script>
	import { page } from '$app/stores'
	import { invalidateAll, goto } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, loading } from '$store/clientStore.js'
	import TeachingTile from './teachingTile.svelte'

	let teaching = $page.data.teaching
	$: teaching = $page.data.teaching

	let subject = '',
		price = '',
		id = 0,
		error = '',
		timer = setTimeout(() => {}, 0),
		searchResults = [],
		found = false,
		searchFinished = true,
		readonly = false

	function searchSubject() {
		if (readonly) return
		clearTimeout(timer)
		timer = setTimeout(search, 500)
		found = false
	}

	async function search() {
		if (readonly) return
		try {
			searchFinished = false
			let res = await fetch('/profil/predmety/hledani', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify({ subject })
			})
			let resJson = await res.json()

			if (resJson.type === 'redirect') {
				goto(resJson.location)
			}

			searchResults = resJson.content
			found = true
		} catch (err) {
			console.log(err)
		}
	}

	function subjectClick(name = '', sbjid = 0) {
		id = sbjid
		subject = name
		searchResults = []
		searchFinished = true
	}

	function teachingEdit(teaching) {
		readonly = true
		$notification = {
			text: 'Uprav předmět ve formuláři a ulož ho.',
			type: 'success'
		}
		subject = teaching.name
		price = String(teaching.price)
		id = teaching.subjectid
	}

	async function teachingRemove(teaching) {
		try {
			let res = await fetch('', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify({ teaching: teaching.id })
			})
			let resJson = await res.json()

			if (resJson.type === 'redirect') {
				goto(resJson.location)
			}

			if (resJson.result === 'error') {
				error = resJson.text
			} else if (resJson.result === 'success') {
				$notification = {
					text: resJson.text,
					type: resJson.result
				}
			}
		} catch (err) {
			console.log(err)
		} finally {
			invalidateAll()
		}
	}

	function handleResult(result) {
		$loading = false
		$notification = {
			text: result.data.text,
			type: result.data.result
		}
		readonly = false
		price = ''
		subject = ''
		id = 0
		invalidateAll()
	}
</script>

<svelte:head>
	<title>Doučované předměty | Profil | Skillnes</title>
</svelte:head>

<div class="container">
	<div>
		<h1>Doučované předměty</h1>
		<p>
			Nastav předměty, u kterých chceš nabízet doučování. Stačí zadat jméno a cenu. Z každé hodiny
			se strhne poplatek 5 % na podporu platformy.
		</p>
	</div>

	<form
		action="?/addSubject"
		method="POST"
		use:enhance={() => {
			$loading = true
			return async ({ result }) => {
				handleResult(result)
			}
		}}
	>
		<div>
			<label for="subject">Předmět</label>
			<input
				type="text"
				name="subject"
				bind:value={subject}
				on:keydown={searchSubject}
				placeholder="Programování"
				required
				{readonly}
			/>
			<input type="hidden" name="id" bind:value={id} />
			{#if subject && !searchFinished}
				<ul>
					{#if found}
						{#each searchResults as item}
							<li
								class="option"
								on:click={() => {
									subjectClick(item.name, item.id)
								}}
								on:keypress={() => {
									subjectClick(item.name, item.id)
								}}
							>
								{item.name}
								{item.ident ? ' - ' + item.ident : ''}
							</li>
						{:else}
							<li>Nic nenalezeno</li>
						{/each}
					{:else}
						<li>Načítání...</li>
					{/if}
				</ul>
			{/if}
		</div>
		<div>
			<label for="price">Cena</label>
			<input type="number" name="price" bind:value={price} placeholder="200" required min="1" />
		</div>
		{#if error != ''}
			<p class="error">{error}</p>
		{/if}
		<button type="submit">Uložit</button>
	</form>

	<div class="tiles">
		{#each teaching as teach}
			<TeachingTile
				{teach}
				editable={true}
				on:editTeaching={() => {
					teachingEdit(teach)
				}}
				on:removeTeaching={() => {
					teachingRemove(teach)
				}}
			/>
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
	form > * {
		margin: 15px;
	}
	form div {
		position: relative;
	}
	.container > div.tiles {
		display: flex;
		flex-wrap: wrap;
		gap: 50px;
		margin: 100px auto 50px;
	}
	ul {
		position: absolute;
		min-width: 100%;
		margin: 0;
		padding: 0;
		background: #fff;
		box-shadow: 0 0 5px 5px #ccc;
		border-radius: 5px;
		list-style-type: none;
		z-index: 10;
		overflow: hidden;
	}
	li {
		padding: 5px 10px;
		border-top: 1px solid #000;
	}
	li.option {
		cursor: pointer;
	}
	li:first-of-type {
		border: none;
	}
	li.option:hover {
		background: #5f1f69;
		color: #fff;
	}
	div.container > div:first-of-type {
		text-align: center;
	}
	input {
		border-bottom: 2px solid #6537a7;
		border-radius: 0;
		box-shadow: none;
	}
	button {
		width: 100%;
		height: 40px;
		margin: 0;
		color: #fff;
		font-weight: bold;
		background: #6537a7;
		border: none;
		border-radius: 10px;
		outline: none;
	}
</style>

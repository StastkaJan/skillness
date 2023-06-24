<script>
	import { page } from '$app/stores'
	import { invalidateAll, goto } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, loading } from '$store/clientStore.js'
	import TeachingTile from './teachingTile.svelte'

	let { teaching, subjects } = $page.data

	$: teaching = $page.data.teaching
	$: subjects = $page.data.subjects

	let subject = '',
		price = '',
		id = 0,
		error = '',
		readonly = false

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
			<label for="id">Předmět</label>
			<select name="id" id="id">
				{#each subjects as { id, name, ident }}
					<option value={id} label="{name} - {ident}" />
				{/each}
			</select>
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
	div.container > div:first-of-type {
		text-align: center;
	}
	input {
		border-bottom: 2px solid #000;
		border-radius: 0;
		box-shadow: none;
	}
	button {
		width: 100%;
		height: 40px;
		margin: 0;
		color: #fff;
		font-weight: bold;
		background: #000;
		border: none;
		border-radius: 5px;
		outline: none;
	}
</style>

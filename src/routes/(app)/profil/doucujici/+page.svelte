<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, loading } from '$store/clientStore.js'
	import placeholder from '$img/placeholder.png'

	export let data

	let teacher = data.teacher

	let { site = '', active = 'F', bio = '', img = '', location = '' } = teacher || {},
		error = '',
		avatar = ''

	if (img) {
		avatar = img
	}

	async function uploadImage(e) {
		try {
			let img = e?.target.files[0]
			const reader = new FileReader()
			reader.readAsDataURL(img)
			reader.onload = async e => {
				if (e?.target?.result == null) {
					throw 'error'
				}

				let image = new Image()
				image.addEventListener('load', async () => {
					let smaller = image.width < image.height ? image.width : image.height
					let width = (image.width - smaller) / 2
					let height = (image.height - smaller) / 2
					let size = 150
					let canvas = document.createElement('canvas')
					canvas.width = size
					canvas.height = size
					var ctx = canvas.getContext('2d')
					ctx?.drawImage(image, width, height, smaller, smaller, 0, 0, size, size)
					avatar = canvas.toDataURL('image/webp')
				})
				image.src = String(e.target.result)
			}
		} catch (err) {
			console.log(err)
		}
	}

	function handleResult(result) {
		$loading = false
		invalidateAll()
		if (result.result === 'error') {
			error = result.text
		} else if (result.result === 'success') {
			error = ''
			$notification = {
				text: result.text,
				type: result.result
			}
		}
	}
</script>

<svelte:head>
	<title>Profil doučujícího | Profil | Skillnes</title>
</svelte:head>

<div class="container">
	<div>
		<h1>Profil doučujícího</h1>
		<p>
			Nastavit si profil doučujícího a nabízej doučování v předmětu, v kterém jsi jednička. Můžeš
			tak získat kredity, za které se můžeš přiučit v tebou zvoleném předmětu.
		</p>
		<p>
			Pro zobrazení v seznamu doučujících je následně potřeba nastavit alespoň jeden doučovaný
			předmět.
		</p>
	</div>

	<form
		action="?/saveDetails"
		method="POST"
		use:enhance={() => {
			$loading = true
			return async ({ result }) => {
				handleResult(result.data)
			}
		}}
	>
		<div>
			<input type="checkbox" name="active" checked={active === 'T'} />
			<label for="active">Zviditelnit stránku</label>
		</div>
		<div class="avatar">
			<label>
				{#if avatar}
					<img id="avatar" src={avatar} alt="profil" />
				{:else}
					<img id="avatar" src={placeholder} alt="profil" />
				{/if}
				<input type="file" name="img" accept="image/png, image/jpeg" on:change={uploadImage} />
				<input type="hidden" name="imgText" bind:value={avatar} />
			</label>
		</div>

		<div>
			<label for="location">Město působení</label>
			<input type="text" name="location" value={location || ''} placeholder="Praha" />
		</div>

		<div>
			<label for="site">Adresa stránky</label>
			<input type="text" name="site" value={site || ''} placeholder="nejlepsidoucujici" />
		</div>

		<div>
			<label for="bio">Text o Vás</label>
			<textarea name="bio" value={bio || ''} placeholder="Ahoj, jsem ... a nabízím..." />
		</div>
		{#if error != ''}
			<p class="error">{error}</p>
		{/if}
		<button type="submit">Uložit</button>
	</form>
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
	input,
	textarea {
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
	img {
		display: block;
		width: 150px;
		margin: auto;
		border-radius: 50%;
		aspect-ratio: 1/1;
	}
	div.avatar input {
		display: none;
	}
</style>

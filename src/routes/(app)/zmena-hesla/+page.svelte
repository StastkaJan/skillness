<script>
	import { invalidateAll } from '$app/navigation'
	import { notification, loading, headerBg } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'
	import EyeOpen from '$icon/eyeOpen.svelte'
	import EyeClose from '$icon/eyeClose.svelte'
	import { enhance } from '$app/forms'

	export let data

	let email = '',
		password = '',
		error = '',
		id = '',
		passwordVisible = false,
		passwordType = 'password'

	id = data.id
	email = data.email

	$headerBg = false

	onDestroy(() => {
		$headerBg = false
	})

	function changeVisibility() {
		passwordVisible = !passwordVisible
		if (passwordVisible) {
			passwordType = 'text'
		} else {
			passwordType = 'password'
		}
	}

	const reset = async () => {
		if (email === '' || password === '') {
			error = 'Vyplňte pole formuláře'
			return
		}

		$loading = true

		try {
			let res = await fetch(`/changepassword?id=${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify({ email, password })
			})
			let resJson = await res.json()
			conso

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
			$notification = {
				text: 'Chyba serveru, zkuste to prosím později.',
				type: 'error'
			}
		} finally {
			$loading = false
		}
	}

	function handleResult(result) {
		console.log(result)
		$loading = false
		if (result.data.result === 'error') {
			error = result.data.text
		} else if (result.data.result === 'success') {
			$notification = {
				text: result.data.text,
				type: result.data.result
			}
		}
		invalidateAll()
	}
</script>

<svelte:head>
	<title>Změna hesla</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="container">
	<div>
		<h1>Obnovení hesla</h1>
		<p>Zadej tvůj email a nové heslo.</p>
	</div>

	<form
		action="?/change"
		method="POST"
		use:enhance={() => {
			$loading = true
			return async ({ result }) => {
				handleResult(result)
			}
		}}
	>
		<input type="hidden" name="id" bind:value={id} />

		<div>
			<label for="pasword">E-mail*</label>
			<input name="email" placeholder="Email" required bind:value={email} />
		</div>

		<div class="password">
			<label for="pasword">Heslo*</label>
			<div>
				<input type={passwordType} name="password" placeholder="Heslo" required />
				{#if passwordVisible}
					<button on:click={changeVisibility}>
						<EyeOpen />
					</button>
				{:else}
					<button on:click={changeVisibility}>
						<EyeClose />
					</button>
				{/if}
			</div>
		</div>
		{#if error != ''}
			<p class="error">{error}</p>
		{/if}
		<button class="button" type="submit">Odeslat</button>
	</form>
</div>

<style>
	div.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 100px;
	}
	form {
		width: 300px;
		margin-top: 50px;
	}
	button.button {
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
	input {
		border-bottom: 2px solid #6537a7;
		border-radius: 0;
		box-shadow: none;
	}
	.password {
		position: relative;
	}
	.password button {
		display: flex;
		align-items: center;
		position: absolute;
		right: 0;
		bottom: 0;
		background: transparent;
	}
</style>

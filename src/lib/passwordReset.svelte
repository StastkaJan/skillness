<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, popup, loading } from '$store/clientStore.js'

	let email = '',
		error = ''

	const resetPass = async () => {
		try {
			let res = await fetch('/api/mailer', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify({ email })
			})
			let resJson = await res.json()
			resJson = resJson.body

			if (resJson.result === 'error') {
				error = resJson.text
			} else if (resJson.result === 'success') {
				$notification = {
					text: resJson.text,
					type: resJson.result
				}
				$popup = {
					title: '',
					component: null,
					props: {}
				}
			}
		} catch (err) {
			console.log(err)
			$notification = {
				text: 'Chyba serveru, zkuste to prosím později.',
				type: 'error'
			}
		}
	}

	function handleResult(result) {
		$loading = false
		if (result.result === 'error') {
			error = result.text
		} else if (result.result === 'success') {
			$notification = {
				text: result.text,
				type: result.result
			}
			$popup = {
				title: '',
				component: null,
				props: {}
			}
		}
		invalidateAll()
	}
</script>

<form
	action="/api/passwordReset"
	method="POST"
	use:enhance={() => {
		$loading = true
		return async ({ result }) => {
			handleResult(result)
		}
	}}
>
	<p>Zadej svůj email pro obnovení hesla</p>
	<div>
		<label for="email">E-mail</label>
		<input class:error={error.length > 0} name="email" bind:value={email} placeholder="Email" />
		{#if error.length > 0}
			<small>{error}</small>
		{/if}
	</div>
	{#if error != ''}
		<p class="error">{error}</p>
	{/if}
	<button type="submit">Odeslat</button>
</form>

<style>
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
	input {
		border-bottom: 2px solid #6537a7;
		border-radius: 0;
		box-shadow: none;
	}
</style>

<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, loading } from '$store/clientStore.js'
	import EyeOpen from '$icon/eyeOpen.svelte'
	import EyeClose from '$icon/eyeClose.svelte'

	export let data = {}

	let { name, email } = data.user,
		password = '',
		error = '',
		passwordVisible = false,
		passwordType = 'password'

	function changeVisibility() {
		passwordVisible = !passwordVisible
		if (passwordVisible) {
			passwordType = 'text'
		} else {
			passwordType = 'password'
		}
	}

	function handleResult(result) {
		$loading = false
		if (result.result === 'error') {
			error = result.text
		} else if (result.result === 'success') {
			error = ''
			$notification = {
				text: result.text,
				type: result.result
			}
		}
		invalidateAll()
	}
</script>

<svelte:head>
	<title>Základní údaje | Profil | Skillnes</title>
</svelte:head>

<div class="container">
	<div>
		<h1>Základní údaje</h1>
		<p>
			Změnil jsi email? Udělal jsi chybu ve jméně? Chceš si změnit heslo? Všechny akce můžeš provést
			na této stránce.
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
			<label for="name">Jméno</label>
			<input type="text" name="name" bind:value={name} placeholder="Adam Omáčka" />
		</div>

		<div>
			<label for="email">E-mail</label>
			<input name="email" bind:value={email} placeholder="adam.omacka@gmail.com" />
		</div>

		<div class="password">
			<label for="pasword">Nové heslo</label>
			<div>
				<input
					type={passwordType}
					name="password"
					on:input={e => {
						password = e.target.value
					}}
					placeholder="Heslo"
				/>
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
		<button class="button" type="submit">Uložit</button>
	</form>
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 750px;
		margin-bottom: 50px;
	}
	div.container > div:first-of-type {
		margin-bottom: 50px;
		text-align: center;
	}
	form {
		width: 300px;
	}
	button.button {
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
	input {
		border-bottom: 2px solid #000;
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

<script>
	import { invalidateAll } from '$app/navigation'
	import { notification, popup, loading } from '$store/clientStore.js'
	import PasswordReset from '$lib/passwordReset.svelte'
	import Register from './register.svelte'
	import EyeOpen from '$icon/eyeOpen.svelte'
	import EyeClose from '$icon/eyeClose.svelte'
	import { enhance } from '$app/forms'

	let error = '',
		passwordVisible = false,
		passwordType = 'password'

	async function resetPass() {
		$popup = {
			title: 'Zapomenuté heslo',
			component: PasswordReset,
			props: {}
		}
	}

	function register() {
		$popup = {
			title: 'Přihlášení',
			component: Register,
			props: {}
		}
	}

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
	action="/api/login"
	method="POST"
	use:enhance={() => {
		$loading = true
		return async ({ result }) => {
			handleResult(result)
		}
	}}
>
	<div>
		<label for="pasword">E-mail*</label>
		<input name="email" placeholder="Email" required />
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
	<button class="link" on:click={resetPass}>Zapomněl jsem heslo</button><br />
	<div>
		<button class="button" type="submit">Přihlásit se</button>
	</div>
	<div class="register">
		<p>Máš účet? <button class="link" on:click={register}>Registrovat se</button></p>
	</div>
</form>

<style>
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
	.register {
		text-align: center;
		margin: 10px 0;
	}
	button.link {
		padding: 0;
		background: transparent;
	}
	.register button.link {
		color: #6537a7;
		font-weight: bold;
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

<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, popup, loading } from '$store/clientStore.js'
	import Login from './login.svelte'
	import EyeOpen from '$icon/eyeOpen.svelte'
	import EyeClose from '$icon/eyeClose.svelte'

	let error = '',
		passwordVisible = false,
		passwordType = 'password'

	function login() {
		$popup = {
			title: 'Přihlášení',
			component: Login,
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

	function hadnleResult(result) {
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
	action="/api/register"
	method="POST"
	use:enhance={() => {
		$loading = true
		return async ({ result }) => {
			hadnleResult(result)
		}
	}}
>
	<div>
		<label for="name">Jméno*</label>
		<input type="text" name="name" placeholder="Adam Omáčka" required />
	</div>

	<div>
		<label for="email">E-mail*</label>
		<input name="email" placeholder="adam.omacka@gmail.com" required />
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
	<div>
		<input name="consent" id="consent" type="checkbox" />
		<label for="consent">
			Přečetl/a jsem si <a href="/podminky/obchodni-podminky">Obchodní podmínky</a> a
			<a href="/podminky/ochrana-udaju">Prohlášení o ochraně osobních údajů</a> a souhlasím s nimi.
		</label>
	</div>
	{#if error != ''}
		<p class="error">{error}</p>
	{/if}
	<button class="button" type="submit">Registrovat se</button>
	<div class="register">
		<p>Máte účet? <button class="link" on:click={login}>Přihlásit se</button></p>
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

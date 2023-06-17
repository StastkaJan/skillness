<script>
	import { invalidateAll } from '$app/navigation'
	import { notification, loading } from '$store/clientStore.js'
	import EyeOpen from '$icon/eyeOpen.svelte'
	import EyeClose from '$icon/eyeClose.svelte'
	import { enhance } from '$app/forms'

	export let data

	console.log(data)

	let error = '',
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
		console.log(result)
		if (result.result === 'error') {
			error = result.text
		} else if (result.result === 'success') {
			$notification = {
				text: result.text,
				type: result.result
			}
		}
		invalidateAll()
	}
</script>

<svelte:head>
	<title>Admin | Skillnes</title>
</svelte:head>

{#if !data?.admin?.admin}
	<div>
		<h1>Přihlášení pro admina</h1>
		<form
			action="?/login"
			method="POST"
			use:enhance={() => {
				$loading = true
				return async ({ result }) => {
					handleResult(result.data)
				}
			}}
		>
			<div>
				<label for="name">Jméno*</label>
				<input name="name" placeholder="Jméno" required />
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
			<div>
				<button class="button" type="submit">Přihlásit se</button>
			</div>
		</form>
	</div>
{:else}
	you are in
{/if}

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

<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, loading, popup } from '$store/clientStore.js'
	import EyeOpen from '$icon/eyeOpen.svelte'
	import EyeClose from '$icon/eyeClose.svelte'

	export let id = 0,
		name = '',
		email = '',
		active = ''

	let error = '',
		passwordVisible = false,
		passwordType = 'password'

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
			$popup = {
				title: '',
				component: null,
				props: {}
			}
			invalidateAll()
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
</script>

<div>
	<form
		action="?/saveUser"
		method="POST"
		use:enhance={() => {
			$loading = true
			return async ({ result }) => {
				handleResult(result.data)
			}
		}}
	>
		{#if id != 0}
			<p>ID: {id}</p>
		{/if}
		<input type="hidden" name="id" value={id} required />
		<div>
			<label for="name">Jméno*</label>
			<input type="text" name="name" value={name} required />
		</div>
		<div>
			<label for="email">Email*</label>
			<input type="text" name="email" value={email} required />
		</div>
		<div>
			<label for="active">Stav*</label>
			<select name="active" id="active" required>
				<option value="W" label="Čeká (aktivní)" selected={active === 'W'} />
				<option value="T" label="Aktivní" selected={active === 'T'} />
				<option value="F" label="Neaktivní" selected={active === 'F'} />
			</select>
		</div>
		<div class="password">
			<label for="pasword">Heslo*</label>
			<div>
				<input type={passwordType} name="password" placeholder="Heslo" />
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
		<button class="button">Uložit</button>
	</form>
</div>

<style>
	button.button {
		background: #000;
		color: #fff;
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
